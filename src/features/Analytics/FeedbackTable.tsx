import tw from 'twin.macro'
import * as Table from 'components/Table'
import { QuadraticAnswer } from '../../../types/answer'

const FeedbackTable = ({ answers }: { answers: QuadraticAnswer[] }) => {
  return (
    <Table.Main>
      <Table.Head>
        <Table.Row>
          <Table.Header css={tw`text-center`}>Feedback</Table.Header>
        </Table.Row>
      </Table.Head>

      <Table.Body>
        {answers.map((answer) => {
          if (answer.feedback) {
            return (
              <>
                {answer.feedback.map((feedback) => (
                  <Table.Row key={feedback.id}>
                    <Table.Data>{feedback.answer}</Table.Data>
                  </Table.Row>
                ))}
              </>
            )
          }
          return null
        })}
      </Table.Body>
    </Table.Main>
  )
}

export default FeedbackTable
