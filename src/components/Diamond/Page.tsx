import { FC } from 'react'
import { RouteComponentProps } from '@reach/router'
import Container from 'components/Container'
import Pool from './Pool'
import tw from 'twin.macro'
import Diamond from './Diamond'
import QSummary from './QSummary'
import useQuadraticAnimated from 'hooks/use-quadratic-animated'

const survey: any = {
  setup: { credits: 100 },
  quadratic: [
    {
      id: '1',
      statement: 'Pamonha',
    },
    {
      id: '2',
      statement: 'Tomato',
    },
    {
      id: '3',
      statement: 'Cheese',
    },
    {
      id: '4',
      statement: 'Baby spinach',
    },
    {
      id: '5',
      statement: 'Orange',
    },
  ],
}

const DiamondPage: FC<RouteComponentProps> = () => {
  const { canVote, vote, reset, questions, availableCredits, pool } = useQuadraticAnimated(survey)

  return (
    <div css={tw`relative overflow-y-hidden`}>
      {false && <QSummary questions={questions} pool={pool} />}

      <Container css={tw`pt-20 flex`}>
        <Pool availableCredits={availableCredits} reset={reset} />

        <div css={tw`flex flex-col flex-1 items-center space-y-16`}>
          {questions.map((question, index) => {
            return (
              <Diamond
                key={question.id}
                index={question.id}
                text={question.statement}
                vote={(v) => vote(index, v)}
                canVote={(v) => canVote(index, v)}
                array={[]}
              />
            )
          })}
        </div>
      </Container>
    </div>
  )
}

export default DiamondPage
