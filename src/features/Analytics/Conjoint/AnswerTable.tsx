import * as Table from 'components/Table'
import tw from 'twin.macro'
import { ConjointAnswer } from '../../../../types/answer'
import { SurveyDashboard } from '../../../../types/survey'
import { checkUserId } from 'utilities/analytics'

const AnswerTable = ({ answers, survey }: { answers: ConjointAnswer[]; survey: SurveyDashboard }) => {
  console.log(answers)

  const hasUserId = checkUserId(answers as [])

  return (
    <Table.Main>
      <Table.Head>
        <Table.Row>
          <Table.Header />
          {hasUserId && <Table.Header css={tw`text-center`}>User Id</Table.Header>}
          {survey.conjoint?.map((question) => (
            <Table.Header key={question.id} css={tw`flex items-center`}>
              {question.id}
            </Table.Header>
          ))}
        </Table.Row>
      </Table.Head>

      <Table.Body>
        {answers
          .sort((a, b) => new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf())
          .map((answer) => (
            <Table.Row key={answer.id}>
              <Table.Data>conjoint</Table.Data>
            </Table.Row>
          ))}
      </Table.Body>
    </Table.Main>
  )
}

export default AnswerTable
