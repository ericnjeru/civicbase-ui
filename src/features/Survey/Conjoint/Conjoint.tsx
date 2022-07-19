import { EditorState, convertFromRaw } from 'draft-js'
import TextEditor from 'components/TextEditor'
import { useEffect } from 'react'
import tw, { theme } from 'twin.macro'
import Card from 'components/Card'
import Typography, { Headline } from 'components/Typography'
import { ConjointItems } from '../../../../types/survey-base'
import { AiFillCheckCircle } from 'react-icons/ai'
import { SurveyRespondent } from '../../../../types/survey'
import useConjoint from 'hooks/use-conjoint'
import { PrimaryButton } from 'components/Button'
import { useMetadata } from 'contexts/metadata'
import useAsync from 'hooks/use-async'
import { createAnswer } from 'services/survey'
import 'draft-js/dist/Draft.css'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import FeedbackQuestions from '../FeedbackQuestions'
import RespondentLayout from 'layouts/Respondent'
import { setSurveyTaken } from 'utilities/survey'
import { AnswerRequest as Answer, Conjoint } from '../../../../types/answer'

type ConjointAnswerForm = {
  feedback?: {
    questions: {
      answer: string
      id: string
    }[]
  }
}

const ConjointRespondent = ({
  survey,
  handleNext,
  preview,
}: {
  survey: SurveyRespondent
  handleNext: () => void
  preview?: boolean
}) => {
  const { metadata, params } = useMetadata()
  const { questions, vote } = useConjoint(survey)
  const { run, isSuccess } = useAsync()
  const {
    setup: { feedback },
  } = survey

  const methods = useForm({
    defaultValues: {
      feedback: feedback?.active
        ? {
            questions: feedback?.questions.map((question) => ({ id: question.id, answer: '' })),
          }
        : undefined,
    },
  })

  useEffect(() => {
    if (isSuccess) {
      setSurveyTaken(survey.id, survey.status)
      handleNext()
    }
  }, [isSuccess, handleNext, survey])

  const handleSelect = (questionIndex: number, id: string) => {
    vote(questionIndex, id)
  }

  const onSubmit: SubmitHandler<ConjointAnswerForm> = (values) => {
    const answer: Answer<Conjoint> = {
      surveyId: survey.id,
      questions,
      researcherId: survey.uid,
      status: survey.status,
      time: {
        ...metadata,
        submitedAt: new Date().toISOString(),
      },
      ...params,
    }

    if (feedback?.active && values?.feedback) {
      const newFeedback = values.feedback.questions.filter((q) => q.answer !== '')

      if (newFeedback.length > 0) {
        answer.feedback = newFeedback
      }
    }

    if (!preview) {
      run(createAnswer(answer))
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <RespondentLayout
          main={
            <>
              {questions.map((question, index) => (
                <div css={tw`grid grid-cols-5 gap-4 mb-24`} key={question.statement}>
                  <div css={tw`mt-20`}>
                    {question.attributes.map((attr) => (
                      <Typography css={tw`mb-6 text-right`} key={attr.key}>
                        {attr.name}
                      </Typography>
                    ))}
                  </div>

                  <div css={tw`col-span-4`}>
                    <Headline css={tw`mb-4 flex`}>
                      {index + 1}.&nbsp;
                      <TextEditor
                        value={EditorState.createWithContent(convertFromRaw(JSON.parse(question.statement)))}
                        onChange={() => {}}
                        readOnly
                        enableImage
                      />
                    </Headline>

                    <div css={tw`grid grid-cols-3 gap-4`}>
                      {question.items.map((item: ConjointItems) => (
                        <Card
                          key="1"
                          css={[
                            tw`mt-4 hover:(ring-brand2 ring-inset ring-2 cursor-pointer) relative`,
                            question.selected === item.id && tw`ring-brand2 ring-inset ring-2 border-none`,
                          ]}
                          onClick={() => handleSelect(index, item.id)}
                        >
                          {question.selected === item.id && (
                            <AiFillCheckCircle
                              size={24}
                              color={theme`colors.brand2`}
                              css={[
                                tw`absolute right-4 top-4 opacity-100`,
                                tw`transition-all ease-in-out duration-1000`,
                              ]}
                            />
                          )}

                          {Object.values(item).map((a, index: number) => (
                            <Typography
                              key={item[`attibute${index}`]}
                              css={[tw`mb-6 last:mb-0 text-center`, index === 0 && tw`font-bold`]}
                            >
                              {item[`attribute${index}`]}
                            </Typography>
                          ))}
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </>
          }
          feedback={<>{feedback?.active && <FeedbackQuestions questions={feedback.questions} />}</>}
          footer={<PrimaryButton type="submit">Submit</PrimaryButton>}
        />
      </form>
    </FormProvider>
  )
}

export default ConjointRespondent
