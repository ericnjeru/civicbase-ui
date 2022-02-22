import tw from 'twin.macro'
import { Editor, EditorState, convertFromRaw } from 'draft-js'
import DynamicBar from 'components/DynamicBar'
import { SurveyRespondent } from '../../../../types/survey'
import Typography, { Headline } from 'components/Typography'
import Vote from 'components/Vote'
import { PrimaryButton, SecondaryButton } from 'components/Button'
import { useContext, useEffect, useState } from 'react'
import { useMetadata } from 'contexts/metadata'
import useAsync from 'hooks/use-async'
import { createAnswer } from 'services/survey'
import useQuadratic from 'hooks/use-quadratic'
import 'draft-js/dist/Draft.css'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import FeedbackQuestions from '../FeedbackQuestions'
import RespondentLayout from 'layouts/Respondent'
import { setSurveyTaken } from 'utilities/survey'
import { AnswerRequest as Answer, Quadratic } from '../../../../types/answer'
import Modal, { ModalContext } from 'components/Modal'
import { HiInformationCircle } from 'react-icons/hi'

const Action = ({ availableCredits }: { availableCredits: number }) => {
  const { openModal } = useContext(ModalContext)

  if (availableCredits > 0) {
    return <PrimaryButton onClick={openModal}>Submit</PrimaryButton>
  }
  return <PrimaryButton type="submit">Submit</PrimaryButton>
}

type QuadraticAnswerForm = {
  feedback?: {
    questions: {
      answer: string
      id: string
    }[]
  }
}

const QuadraticRespondent = ({ survey, handleNext }: { survey: SurveyRespondent; handleNext: () => void }) => {
  const { run, isSuccess } = useAsync()
  const { questions, availableCredits, vote, canVote } = useQuadratic(survey)
  const { metadata, params, onQuestionPageLoad, onStart } = useMetadata()
  const [isFirstVote, setFirstVote] = useState(false)
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
    onQuestionPageLoad()
  }, [onQuestionPageLoad])

  useEffect(() => {
    if (isSuccess) {
      setSurveyTaken(survey.id, survey.status)
      handleNext()
    }
  }, [isSuccess, handleNext, survey])

  const handleVote = (direction: number, index: number) => {
    vote(index, direction)

    if (!isFirstVote && !survey.message?.welcome) {
      setFirstVote(true)
      onStart()
    }
  }

  const onSubmit: SubmitHandler<QuadraticAnswerForm> = (values) => {
    const answer: Answer<Quadratic> = {
      surveyId: survey.id,
      questions,
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
                <div css={tw`sticky z-50 bg-white`} style={{ top: 70 }}>
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
                        handleVote={(direction: number) => handleVote(direction, index)}
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
          footer={
            <Modal
              header={<Typography>Credit Left</Typography>}
              icon={<HiInformationCircle size="24" />}
              action={<Action availableCredits={availableCredits} />}
              footer={<SecondaryButton onClick={methods.handleSubmit(onSubmit)}>Submit</SecondaryButton>}
            >
              <Typography>
                You have {availableCredits} {token === 'Custom' ? customToken : token} left, please confirm if you want
                to submit your answer anyway.
              </Typography>
            </Modal>
          }
        />
      </form>
    </FormProvider>
  )
}

export default QuadraticRespondent
