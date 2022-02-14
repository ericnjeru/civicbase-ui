import * as Table from 'components/Table'
import Tooltip from 'components/Tooltip'
import Typography from 'components/Typography'
import tw from 'twin.macro'
import { toCamelCase } from 'utilities/util'
import { QuadraticAnswer } from '../../../../../types/answer'
import { SurveyDashboard } from '../../../../../types/survey'
import DownloadAnswers from './DownloadAnswers'

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
    <div>
      <div css={tw`flex justify-end items-center mb-4`}>
        <DownloadAnswers answers={answers} hasUserId={hasUserId} survey={survey} />
      </div>

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
            <Table.Header css={tw`text-center`}>status</Table.Header>
          </Table.Row>
        </Table.Head>

        <Table.Body>
          {answers
            .sort((a, b) => new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf())
            .map((answer, index) => (
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
                {answer.questions
                  .sort((a, b) => a.id.localeCompare(b.id))
                  .map((question) => (
                    <Table.Data css={tw`text-center`} key={question.id}>
                      {question.vote}
                    </Table.Data>
                  ))}
                <Table.Data css={tw`text-center`}>{answer.leftCredits}</Table.Data>
                <Table.Data css={tw`text-center`}>
                  <div css={tw`w-full flex justify-center`}>
                    <Tooltip placement="left" tip={toCamelCase(answer.status)}>
                      <div
                        css={[
                          tw`w-3 h-3 rounded-full`,
                          answer.status === 'published' && tw`bg-published`,
                          answer.status === 'pilot' && tw`bg-pilot`,
                          answer.status === 'finished' && tw`bg-finished`,
                        ]}
                      />
                    </Tooltip>
                  </div>
                </Table.Data>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Main>
    </div>
  )
}

export default AnswerTable
