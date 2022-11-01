import tw from 'twin.macro'
import { Editor, EditorState, convertFromRaw } from 'draft-js'
import { SurveyRespondent } from '../../../../types/survey'
import 'draft-js/dist/Draft.css'
import useQuadraticAnimated from 'hooks/use-quadratic-animated'
import { Pool, QSummary, Diamond } from 'components/Diamond'
import Container from 'components/Container'

const DiamondRespondendPage = ({ survey }: { survey: SurveyRespondent; handleNext: () => void; preview?: boolean }) => {
  const { canVote, vote, reset, questions, availableCredits, pool } = useQuadraticAnimated(survey)

  return (
    <div css={tw`relative overflow-y-hidden`}>
      {false && <QSummary questions={questions} pool={pool} />}

      <Container css={tw`pt-20 flex`}>
        <Pool availableCredits={availableCredits} reset={reset} />

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
