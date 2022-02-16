import tw from 'twin.macro'
import * as Table from 'components/Table'
import { AnswerResponse as Answer, Quadratic } from '../../../../../types/answer'

type Result = {
  pilot: {
    [key: string]: number
  }
  published: {
    [key: string]: number
  }
  finished: {
    [key: string]: number
  }
}

const ResultTable = ({ answers }: { answers: Answer<Quadratic>[] }) => {
  const results = answers.reduce(
    (results: Result, answer) => {
      answer.questions.forEach((question) => {
        if (question.id) {
          results[answer.status][question.id] = results[answer.status][question.id]
            ? results[answer.status][question.id] + question.vote
            : question.vote
        }
      })
      return results
    },
    {
      pilot: {},
      published: {},
      finished: {},
    },
  )

  return (
    <Table.Main>
      <Table.Head>
        <Table.Row>
          <Table.Header>Question Id</Table.Header>
          <Table.Header>Result</Table.Header>
        </Table.Row>

        <Table.Row>
          <Table.Header colSpan={2} css={tw`text-center text-red-400`}>
            Pilot
          </Table.Header>
        </Table.Row>
      </Table.Head>

      <Table.Body>
        {Object.keys(results.pilot)
          .sort()
          .map((row) => (
            <Table.Row key={row}>
              <Table.Data>{row}</Table.Data>
              <Table.Data>{results.pilot[row]}</Table.Data>
            </Table.Row>
          ))}
      </Table.Body>

      {Object.keys(results.published).length > 0 ? (
        <Table.Head>
          <Table.Row>
            <Table.Header colSpan={2} css={tw`text-center text-red-400`}>
              Published
            </Table.Header>
          </Table.Row>
        </Table.Head>
      ) : null}

      <Table.Body>
        {Object.keys(results.published)
          .sort()
          .map((row) => (
            <Table.Row key={row}>
              <Table.Data>{row}</Table.Data>
              <Table.Data>{results.published[row]}</Table.Data>
            </Table.Row>
          ))}
      </Table.Body>
    </Table.Main>
  )
}

export default ResultTable
