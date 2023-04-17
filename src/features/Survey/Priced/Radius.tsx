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
import { createPricedAnswer } from 'services/survey'
import tw, { theme } from 'twin.macro'
import { setSurveyTaken } from 'utilities/survey'

import { PricedAnswerRequest as Answer, ObservationAnswer, Priced } from '../../../../types/answer'
import { SurveyRespondent } from '../../../../types/survey'
import FeedbackQuestions from '../FeedbackQuestions'

const Action = ({
  availableCredits,
  disabled,
  isLoading,
  buttonText,
  setModalOpen,
}: {
  availableCredits: number
  disabled: boolean
  isLoading?: boolean
  buttonText: string
  setModalOpen: (status: boolean) => void
}) => {
  const { openModal } = useContext(ModalContext)
  const hasCreditLeft = availableCredits > 0

  const handleConfirmation = (e: any) => {
    if (hasCreditLeft) {
      if (setModalOpen) {
        setModalOpen(true)
      } else {
        openModal(e)
      }
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
        <div>{buttonText}</div>
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
  handleNext,
  preview,
}: {
  survey: SurveyRespondent
  handleNext: () => void
  preview?: boolean
}) => {
  const { run, isLoading } = useAsync()
  const [currentObservation, setCurrentObservation] = useState(1)
  const [totalObservations, setTotalObservations] = useState(1)
  const { questions, availableCredits, vote, canVote } = usePriced(survey, currentObservation)
  const { metadata, params, onQuestionPageLoad, onStart } = useMetadata()
  const [isFirstVote, setFirstVote] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const [observationAnswers, setObservationAswers] = useState<ObservationAnswer<Priced>[]>([])
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
    if (survey) {
      const totalObservations: number = survey.features?.totalObservations ?? 1
      setTotalObservations(totalObservations)
    }
  }, [survey])

  const handleVote = (direction: number, index: number) => {
    vote(index, direction)

    if (!isFirstVote && !survey.message?.welcome) {
      setFirstVote(true)
      onStart()
    }
  }

  const createObservationAnswer: SubmitHandler<PricedAnswerForm> = (values) => {
    const newQuestions = questions.map((question) => {
      return {
        id: question.id,
        vote: question.vote,
        userVotes: question.userVotes,
        credits: question.credits,
        defaultAnswer: question.ogVotes,
        cost: question.cost,
        order: question.order,
      }
    })

    const observationAnswer: ObservationAnswer<Priced> = {
      questions: newQuestions,
      time: {
        ...metadata,
        submitedAt: new Date().toISOString(),
      },
      leftCredits: availableCredits,
      currentObservation: currentObservation,
      ...params,
    }

    if (feedback?.active && values?.feedback) {
      const newFeedback = values.feedback.questions.filter((q) => q.answer !== '')

      if (newFeedback.length > 0) {
        observationAnswer.feedback = newFeedback
      }
    }
    return observationAnswer
  }
  const onSubmit: SubmitHandler<PricedAnswerForm> = (values) => {
    if (isModalOpen) {
      setModalOpen(false)
    }

    const observationAnswer = createObservationAnswer(values)
    if (currentObservation < totalObservations) {
      setObservationAswers((prevObservations) => [...prevObservations, observationAnswer])
      setCurrentObservation((curr) => curr + 1)
    } else {
      if (!preview) {
        const answer: Answer<Priced> = {
          surveyId: survey.id,
          status: survey.status,
          observations: [...observationAnswers, observationAnswer],
        }
        run(createPricedAnswer(answer))
        setSurveyTaken(survey.id, survey.status)
        handleNext()
      } else {
        alert('Can not submit survey. You must be logged out from current browser.')
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
              open={isModalOpen}
              header={<Typography css={tw`text-black`}>Credit Left</Typography>}
              icon={<HiInformationCircle size="24" color={theme`colors.black`} />}
              action={
                <Action
                  availableCredits={availableCredits}
                  disabled={isLoading}
                  isLoading={isLoading}
                  buttonText={currentObservation < totalObservations ? 'Next' : 'Submit'}
                  setModalOpen={setModalOpen}
                />
              }
              footer={
                <SecondaryButton
                  onClick={methods.handleSubmit(onSubmit)}
                  css={tw`flex justify-center items-center space-x-4`}
                  disabled={isLoading}
                >
                  {isLoading && <Spinner variant="light" />}
                  <div>{currentObservation < totalObservations ? 'Next' : 'Submit'}</div>
                </SecondaryButton>
              }
            >
              <Typography css={tw`text-black`}>
                You have {availableCredits} {token === 'Custom' ? customToken : token} left, please confirm if you want
                to proceed with your answer anyway.
              </Typography>
            </Modal>
          }
        />
      </form>
    </FormProvider>
  )
}

export default PricedRespondent
