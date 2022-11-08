import { useEffect } from 'react'
import { useForm, Controller, SubmitHandler, FormProvider } from 'react-hook-form'

import { RadioGroup } from '@headlessui/react'
import { PrimaryButton } from 'components/Button'
import RadioButton from 'components/Form/RadioButton'
import TextEditor from 'components/TextEditor'
import Typography, { Headline } from 'components/Typography'
import { useMetadata } from 'contexts/metadata'
import { convertFromRaw, EditorState } from 'draft-js'
import useAsync from 'hooks/use-async'
import RespondentLayout from 'layouts/Respondent'
import { createAnswer } from 'services/survey'
import tw from 'twin.macro'
import { setSurveyTaken } from 'utilities/survey'

import { AnswerRequest as Answer, Likert } from '../../../../types/answer'
import { SurveyRespondent } from '../../../../types/survey'
import FeedbackQuestions from '../FeedbackQuestions'

type LikertAnswerForm = {
  feedback?: {
    questions: {
      answer: string
      id: string
    }[]
  }
  questions: any // TODO:
}

const LikertRespondent = ({
  survey,
  handleNext,
  preview,
}: {
  survey: SurveyRespondent
  handleNext: () => void
  preview?: boolean
}) => {
  const { run, isSuccess } = useAsync()
  const { metadata, params } = useMetadata()
  const {
    setup: { feedback },
  } = survey

  const methods = useForm({
    defaultValues: {
      questions: survey.likert?.map((question) => ({ id: question.id, item: [] })),
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

  const onSubmit: SubmitHandler<LikertAnswerForm> = ({ questions, feedback: respondentFeedback }) => {
    const answer: Answer<Likert> = {
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

    if (feedback?.active && respondentFeedback) {
      const newFeedback = respondentFeedback.questions.filter((q) => q.answer !== '')

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
              {survey?.likert?.map((question, questionIndex) => (
                <div key={question.id} css={tw`mb-32`}>
                  <Headline css={tw`mb-4 flex`}>
                    {questionIndex + 1}.&nbsp;
                    <TextEditor
                      value={EditorState.createWithContent(convertFromRaw(JSON.parse(question.statement)))}
                      onChange={() => {}}
                      readOnly
                      enableImage
                    />
                  </Headline>

                  <div css={tw`grid grid-cols-2 gap-4 border-b-2`}>
                    <div css={tw`col-span-1`} />
                    <div css={tw`flex space-x-16 mb-2`}>
                      {[1, 2, 3, 4, 5].map((item) => (
                        <Typography key={item}>{item}</Typography>
                      ))}
                    </div>
                  </div>

                  {question.items.map((item, itemIndex) => (
                    <div css={tw`grid grid-cols-2 gap-4 mt-2 mb-6`} key={item.description}>
                      <div>
                        <Typography>{item.description}</Typography>
                      </div>
                      <Controller
                        rules={{ required: true }}
                        control={methods.control}
                        name={`questions.${questionIndex}.item.${itemIndex}.vote` as any}
                        render={({ field }) => (
                          <RadioGroup {...field} id={`questions.${questionIndex}.item.${itemIndex}.vote`}>
                            <RadioGroup.Option value={1}>
                              {({ ...props }) => <RadioButton {...props} css={tw`mr-14`} />}
                            </RadioGroup.Option>
                            <RadioGroup.Option value={2}>
                              {({ ...props }) => <RadioButton {...props} css={tw`mr-14`} />}
                            </RadioGroup.Option>
                            <RadioGroup.Option value={3}>
                              {({ ...props }) => <RadioButton {...props} css={tw`mr-14`} />}
                            </RadioGroup.Option>
                            <RadioGroup.Option value={4}>
                              {({ ...props }) => <RadioButton {...props} css={tw`mr-14`} />}
                            </RadioGroup.Option>
                            <RadioGroup.Option value={5}>
                              {({ ...props }) => <RadioButton {...props} css={tw`mr-14`} />}
                            </RadioGroup.Option>
                          </RadioGroup>
                        )}
                      />
                    </div>
                  ))}
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

export default LikertRespondent
