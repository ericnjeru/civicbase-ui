import { EditorState, convertFromRaw } from 'draft-js'
import * as Table from 'components/Table'
import { ConjointAnswer } from '../../../../types/answer'
import { SurveyDashboard } from '../../../../types/survey'
import { Conjoint } from '../../../../types/survey-base'

const ResultTable = ({ answers, survey }: { answers: ConjointAnswer[]; survey: SurveyDashboard }) => {
  console.log('survey', survey)
  console.log(answers)

  const getQuestionText = (question: Conjoint) => {
    const text = EditorState.createWithContent(convertFromRaw(JSON.parse(question.statement)))

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
