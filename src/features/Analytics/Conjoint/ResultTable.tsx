import { EditorState, convertFromRaw } from 'draft-js'
import * as Table from 'components/Table'
import { SurveyDashboard } from '../../../../types/survey'
import { AnswerResponse as Answer, Conjoint } from '../../../../types/answer'

const ResultTable = ({ answers, survey }: { answers: Answer<Conjoint>[]; survey: SurveyDashboard }) => {
  console.log(answers)

  const getQuestionText = ({ statement }: { statement: string }) => {
    const text = EditorState.createWithContent(convertFromRaw(JSON.parse(statement)))

    return text.getCurrentContent().getPlainText('\u0001')
  }

  return (
    <Table.Main>
      {survey.conjoint?.map((question) => (
        <>
          <Table.Head key={question.id}>
            <Table.Row>
              <Table.Header>{getQuestionText(question)}</Table.Header>
              <Table.Header>{question.id}</Table.Header>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            {question.attributes.map((attribute) => (
              <Table.Row key={attribute.id}>
                <Table.Data>{}</Table.Data>
                <Table.Data>Candidate A</Table.Data>
              </Table.Row>
            ))}
          </Table.Body>
        </>
      ))}
    </Table.Main>
  )
}

export default ResultTable
