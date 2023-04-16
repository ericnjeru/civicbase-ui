import { useContext, useEffect, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { HiInformationCircle } from 'react-icons/hi'

import { PrimaryButton, SecondaryButton } from 'components/Button'
import DynamicBar from 'components/DynamicBar'
import Modal, { ModalContext } from 'components/Modal'
import Spinner from 'components/Spinner'
import TextEditor from 'components/TextEditor'
import Typography, { Headline } from 'components/Typography'
import Vote from 'components/Vote'
import { useMetadata } from 'contexts/metadata'
import { EditorState, convertFromRaw } from 'draft-js'
import 'draft-js/dist/Draft.css'
import useAsync from 'hooks/use-async'
import usePriced from 'hooks/use-priced'
import RespondentLayout from 'layouts/Respondent'
import { createAnswer } from 'services/survey'
import tw, { theme } from 'twin.macro'
import { setSurveyTaken } from 'utilities/survey'

import { AnswerRequest as Answer, Priced } from '../../../../types/answer'
import { SurveyRespondent } from '../../../../types/survey'
import FeedbackQuestions from '../FeedbackQuestions'

const Action = ({
  availableCredits,
  disabled,
  isLoading,
}: {
  availableCredits: number
  disabled: boolean
  isLoading?: boolean
}) => {
  const { openModal } = useContext(ModalContext)
  const hasCreditLeft = availableCredits > 0

  const handleConfirmation = (e: any) => {
    if (hasCreditLeft) {
      openModal(e)
    }
  }

  return (
    <div css={tw`flex justify-center`}>
      <PrimaryButton
        onClick={handleConfirmation}
        disabled={disabled}
        type={hasCreditLeft ? 'button' : 'submit'}
        css={tw`flex justify-center items-center space-x-4`}
      >
        {isLoading && <Spinner variant="light" />}
        <div>Submit</div>
      </PrimaryButton>
    </div>
  )
}

type PricedAnswerForm = {
  feedback?: {
    questions: {
      answer: string
      id: string
    }[]
  }
}

const PricedRespondent = ({
  survey,
  currentObservation,
  totalObservations,
  handleNext,
  preview,
}: {
  survey: SurveyRespondent
  currentObservation: number
  totalObservations: number
  handleNext: () => void
  preview?: boolean
}) => {
  const { run, isLoading } = useAsync()
  const { questions, availableCredits, vote, canVote } = usePriced(survey, currentObservation)
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

  const handleVote = (direction: number, index: number) => {
    vote(index, direction)

    if (!isFirstVote && !survey.message?.welcome) {
      setFirstVote(true)
      onStart()
    }
  }

  const onSubmit: SubmitHandler<PricedAnswerForm> = (values) => {
    const newQuestions = questions.map((question) => {
      return {
        id: question.id,
        vote: question.vote,
        credits: question.credits,
        defaultAnswer: question.ogVotes,
        order: question.order,
      }
    })

    const answer: Answer<Priced> = {
      surveyId: survey.id,
      questions: newQuestions,
      status: survey.status,
      time: {
        ...metadata,
        submitedAt: new Date().toISOString(),
      },
      leftCredits: availableCredits,
      totalObservations: totalObservations,
      currentObservation: currentObservation,
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
      setSurveyTaken(survey.id, survey.status)
      if (currentObservation < totalObservations) {
        location.reload()
      } else {
        handleNext()
      }
    }
  }
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <RespondentLayout
          header={
            <>
              {credits && (
                <div css={tw`sticky z-50 top-4 bg-white mobile:px-3`}>
                  <DynamicBar
                    total={credits}
                    availableCredits={availableCredits}
                    language={token === 'Custom' ? customToken : token}
                    currentObservation={currentObservation}
                    totalObservations={totalObservations}
                  />
                </div>
              )}
            </>
          }
          main={
            <div css={tw`flex flex-col items-center space-y-24 pt-20 pb-20 mobile:mx-3`}>
              {questions.map((question, index) => {
                return (
                  <div key={question.id || `${question.ogVotes}_${index}`} css={tw`flex w-full flex-col`}>
                    <Headline css={tw`mb-4 flex`}>
                      {index + 1}.&nbsp;
                      <TextEditor
                        value={EditorState.createWithContent(convertFromRaw(JSON.parse(question.statement)))}
                        onChange={() => {}}
                        readOnly
                        enableImage
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
              header={<Typography css={tw`text-black`}>Credit Left</Typography>}
              icon={<HiInformationCircle size="24" color={theme`colors.black`} />}
              action={<Action availableCredits={availableCredits} disabled={isLoading} isLoading={isLoading} />}
              footer={
                <SecondaryButton
                  onClick={methods.handleSubmit(onSubmit)}
                  css={tw`flex justify-center items-center space-x-4`}
                  disabled={isLoading}
                >
                  {isLoading && <Spinner variant="light" />}
                  <div>Submit</div>
                </SecondaryButton>
              }
            >
              <Typography css={tw`text-black`}>
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

export default PricedRespondent
