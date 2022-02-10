import tw from 'twin.macro'
import { Editor, EditorState, convertFromRaw } from 'draft-js'
import DynamicBar from 'components/DynamicBar'
import { SurveyRespondent } from '../../../../types/survey'
import { Headline } from 'components/Typography'
import Vote from 'components/Vote'
import { PrimaryButton } from 'components/Button'
import { useEffect } from 'react'
import { useMetadata } from 'contexts/metadata'
import { Answer } from '../../../../types/answer'
import useAsync from 'hooks/use-async'
import { createAnswer } from 'services/survey'
import useQuadratic from 'hooks/use-quadratic'
import 'draft-js/dist/Draft.css'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import FeedbackQuestions from '../FeedbackQuestions'
import RespondentLayout from 'layouts/Respondent'

type QuadraticAnswerForm = {
  feedback?: {
    questions: {
      answer: string
    }[]
  }
}

const Quadratic = ({ survey, handleNext }: { survey: SurveyRespondent; handleNext: () => void }) => {
  const { run, isSuccess } = useAsync()
  const { questions, availableCredits, vote, canVote } = useQuadratic(survey)
  const { metadata, params, pageLoad } = useMetadata()
  const {
    setup: { credits, feedback },
    language: { thumbsDown, thumbsUp, token, customToken = '' },
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
    pageLoad()
  }, [pageLoad])

  useEffect(() => {
    if (isSuccess) {
      handleNext()
    }
  }, [isSuccess, handleNext])

  const onSubmit: SubmitHandler<QuadraticAnswerForm> = (values) => {
    const answer: Answer = {
      surveyId: survey.id,
      questions,
      researcherId: survey.uid,
      status: survey.status,
      time: {
        ...metadata,
        submitedAt: new Date().toISOString(),
      },
      leftCredits: availableCredits,
      ...params,
    }

    if (feedback?.active && values?.feedback) {
      const newFeedback = values.feedback.questions.filter((q) => q.answer !== '')

      if (newFeedback.length > 0) {
        answer.feedback = newFeedback
      }
    }

    run(createAnswer(answer))
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <RespondentLayout
          header={
            <>
              {credits && (
                <div css={tw`sticky z-50`} style={{ top: 70 }}>
                  <DynamicBar
                    total={credits}
                    availableCredits={availableCredits}
                    language={token === 'Custom' ? customToken : token}
                  />
                </div>
              )}
            </>
          }
          main={
            <div css={tw`flex flex-col items-center space-y-24 mt-20 pb-20`}>
              {questions.map((question, index) => {
                return (
                  <div key={question.id} css={tw`flex w-full flex-col`}>
                    <Headline css={tw`mb-4 flex`}>
                      {index + 1}.&nbsp;
                      <Editor
                        editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(question.statement)))}
                        onChange={() => {}}
                        readOnly
                      />
                    </Headline>

                    <div css={tw`flex justify-center mt-12`}>
                      <Vote
                        thumbsDown={thumbsDown}
                        thumbsUp={thumbsUp}
                        total={credits}
                        handleVote={(direction: number) => vote(index, direction)}
                        vote={question.vote}
                        creditSpent={question.credits}
                        canVoteUp={canVote(index, 1)}
                        canVoteDown={canVote(index, -1)}
                        token={token === 'Custom' ? customToken : token}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          }
          feedback={<>{feedback?.active && <FeedbackQuestions questions={feedback.questions} />}</>}
          footer={<PrimaryButton type="submit">Submit</PrimaryButton>}
        />
      </form>
    </FormProvider>
  )
}

export default Quadratic
