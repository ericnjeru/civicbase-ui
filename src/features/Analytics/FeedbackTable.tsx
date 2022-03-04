import * as Table from 'components/Table'
import Typography from 'components/Typography'
import { useAnalytics } from 'contexts/analytics'

const FeedbackTable = () => {
  const { feedback, survey, mode } = useAnalytics()

  if (!feedback && !survey?.setup.feedback?.active) {
    return null
  }

  return (
    <Table.Main>
      <Table.Head>
        <Table.Row>
          <Table.Header>Question ID</Table.Header>
          <Table.Header>Feedback</Table.Header>
        </Table.Row>
      </Table.Head>

      <Table.Body>
        {feedback && feedback[mode]?.length > 0 ? (
          <>
            {feedback[mode].map(({ answer, id }: { answer: string; id: string }) => (
              <Table.Row key={id}>
                <Table.Data>{id}</Table.Data>
                <Table.Data>{answer}</Table.Data>
              </Table.Row>
            ))}
          </>
        ) : (
          <Table.Row>
            <Table.Data>
              <Typography>No feedback so far</Typography>
            </Table.Data>
          </Table.Row>
        )}
      </Table.Body>
    </Table.Main>
  )
}

export default FeedbackTable
