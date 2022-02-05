import * as Table from 'components/Table'
import Typography from 'components/Typography'
import tw from 'twin.macro'
import { QuadraticAnswer } from '../../../../types/answer'
import { SurveyDashboard } from '../../../../types/survey'

const userId = ['userid', 'userId', 'userID']

const AnswerTable = ({ survey, answers }: { survey: SurveyDashboard; answers: QuadraticAnswer[] }) => {
  const {
    language: { token, customToken },
  } = survey

  const checkUserId = () => {
    let flag = false
    answers.forEach((answer) => {
      userId.forEach((id) => {
        if (answer[id]) {
          flag = true
        }
      })
    })

    return flag
  }

  const hasUserId = checkUserId()

  return (
    <Table.Main>
      <Table.Head>
        <Table.Row>
          <Table.Header />
          {hasUserId && <Table.Header css={tw`text-center`}>User Id</Table.Header>}
          {survey.quadratic?.map((question) => (
            <Table.Header css={tw`text-center`} key={question.id}>
              {question.id}
            </Table.Header>
          ))}

          <Table.Header css={tw`text-center`}>{token === 'Custom' ? customToken : token} left</Table.Header>
        </Table.Row>
      </Table.Head>

      <Table.Body>
        {answers.map((answer, index) => (
          <Table.Row key={answer.id}>
            <Table.Data>{index + 1}</Table.Data>
            {hasUserId && (
              <Table.Data css={tw`text-center`}>
                {userId.map((id) => {
                  if (answer[id]) {
                    return <Typography>{answer[id]}</Typography>
                  }
                  return null
                })}
              </Table.Data>
            )}
            {answer.questions.map((question) => (
              <Table.Data css={tw`text-center`} key={question.id}>
                {question.vote}
              </Table.Data>
            ))}
            <Table.Data css={tw`text-center`}>{answer.leftCredits}</Table.Data>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Main>
  )
}

export default AnswerTable
