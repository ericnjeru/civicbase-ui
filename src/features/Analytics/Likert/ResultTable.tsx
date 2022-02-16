import * as Table from 'components/Table'
import Typography from 'components/Typography'
import { EditorState, convertFromRaw } from 'draft-js'
import tw from 'twin.macro'
import { LikertAnswer } from '../../../../types/answer'
import { SurveyDashboard } from '../../../../types/survey'
import { Likert } from '../../../../types/survey-base'

const ResultTable = ({ survey, answers }: { survey: SurveyDashboard; answers: LikertAnswer[] }) => {
  if (!survey.likert) {
    return null
  }

  const resultMatrix = survey.likert.map((question) => {
    const matrix: number[][] = []

    question.items.forEach(() => {
      matrix.push([0, 0, 0, 0, 0])
    })

    return matrix
  })

  answers.forEach((answer) => {
    answer.questions.forEach((question, questionIndex) => {
      question.item.forEach((item, itemIndex) => {
        resultMatrix[questionIndex][itemIndex][item.vote - 1]++
      })
    })
  })

  const getQuestionText = (question: Likert) => {
    const text = EditorState.createWithContent(convertFromRaw(JSON.parse(question.statement)))

    return text.getCurrentContent().getPlainText('\u0001')
  }

  return (
    <Table.Main>
      {survey.likert?.map((question, questionIndex) => (
        <>
          <Table.Head key={question.id}>
            <Table.Row>
              <Table.Header css={tw`flex items-center`}>
                <Typography css={tw`text-brand2`}>{question.id}</Typography> &nbsp; {getQuestionText(question)}
              </Table.Header>
              {[1, 2, 3, 4, 5].map((level) => (
                <Table.Header key={level}>{level}</Table.Header>
              ))}
            </Table.Row>
          </Table.Head>

          {question.items.map((item, itemIndex) => (
            <Table.Body key={item.description}>
              <Table.Row>
                <Table.Data>{item.description}</Table.Data>
                {resultMatrix[questionIndex][itemIndex].map((result: number) => (
                  <Table.Data key={result}>{result}</Table.Data>
                ))}
              </Table.Row>
            </Table.Body>
          ))}
        </>
      ))}
    </Table.Main>
  )
}

export default ResultTable
