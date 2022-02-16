import tw from 'twin.macro'
import * as Table from 'components/Table'
import Typography from 'components/Typography'
import { AnswerResponse as Answer } from '../../../types/answer'

const FeedbackTable = ({ answers }: { answers: Answer<unknown>[] }) => {
  const isFeedback = () => {
    let flag = false

    answers.forEach((answer) => {
      if (answer.feedback) {
        flag = true
      }
    })

    return flag
  }

  return (
    <Table.Main>
      <Table.Head>
        <Table.Row>
          <Table.Header css={tw`text-center`}>Feedback</Table.Header>
        </Table.Row>
      </Table.Head>

      <Table.Body>
        {isFeedback() ? (
          answers.map((answer) => {
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
          })
        ) : (
          <Table.Row>
            <Table.Data>
              <Typography>There is no feedback so far</Typography>
            </Table.Data>
          </Table.Row>
        )}
      </Table.Body>
    </Table.Main>
  )
}

export default FeedbackTable
