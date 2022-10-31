import tw from 'twin.macro'
import { Editor, EditorState, convertFromRaw } from 'draft-js'
import { SurveyRespondent } from '../../../../types/survey'
import { PrimaryButton } from 'components/Button'
import { useContext } from 'react'
import 'draft-js/dist/Draft.css'
import { ModalContext } from 'components/Modal'
import Spinner from 'components/Spinner'
import useQuadraticAnimated from 'hooks/use-quadratic-animated'
import { Pool, QSummary, Diamond } from 'components/Diamond'
import Container from 'components/Container'

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

type QuadraticAnswerForm = {
  feedback?: {
    questions: {
      answer: string
      id: string
    }[]
  }
}
const DiamondRespondendPage = ({
  survey,
  handleNext,
  preview,
}: {
  survey: SurveyRespondent
  handleNext: () => void
  preview?: boolean
}) => {
  const { canVote, vote, reset, questions, availableCredits, pool } = useQuadraticAnimated(survey)

  return (
    <div css={tw`relative overflow-y-hidden`}>
      {false && <QSummary questions={questions} pool={pool} />}

      <Container css={tw`pt-20 flex`}>
        <Pool availableCredits={availableCredits} pool={pool} reset={reset} />

        <div css={tw`flex flex-col flex-1 items-center space-y-16`}>
          {questions.map((question, index) => {
            return (
              <>
                <Editor
                  editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(question.statement)))}
                  onChange={() => {}}
                  readOnly
                />

                <Diamond
                  key={question.id}
                  index={question.id}
                  vote={(v) => vote(index, v)}
                  canVote={(v) => canVote(index, v)}
                  array={[]}
                />
              </>
            )
          })}
        </div>
      </Container>
    </div>
  )
}

export default DiamondRespondendPage
