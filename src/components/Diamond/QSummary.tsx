import * as Table from 'components/Table'
import { Question } from 'hooks/use-quadratic-animated'
import tw from 'twin.macro'

const QSummary = ({ questions, pool }: { questions: Question[]; pool: number[] }) => {
  return (
    <div css={tw`absolute left-0 bottom-0 mb-4 ml-4 w-full z-50 bg-white`}>
      <div css={tw`text-sm`}>Pool [{pool.join(', ')}]</div>
      <Table.Main css={tw`w-full`}>
        <Table.Head>
          <Table.Row>
            <Table.Header>Question</Table.Header>
            <Table.Header>Vote</Table.Header>
            <Table.Header>Animated</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {questions.map((q) => (
            <Table.Row key={q.id}>
              <Table.Data>{q.statement}</Table.Data>
              <Table.Data>{q.vote}</Table.Data>
              <Table.Data css={tw`text-sm ml-2`}>[{q.animated.join(', ')}]</Table.Data>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Main>
    </div>
  )
}

export default QSummary
