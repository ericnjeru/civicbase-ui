import * as Table from 'components/Table'
import Typography from 'components/Typography'
import { useAnalytics } from 'contexts/analytics'
import { EditorState, convertFromRaw } from 'draft-js'
import tw from 'twin.macro'

const ResultTable = () => {
  const { survey, results } = useAnalytics()

  const getQuestionText = ({ statement }: { statement: string }) => {
    const text = EditorState.createWithContent(convertFromRaw(JSON.parse(statement)))

    return text.getCurrentContent().getPlainText('\u0001')
  }

  return (
    <Table.Main>
      {survey?.likert?.map((question, questionIndex) => (
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
                {results &&
                  results.length > 0 &&
                  results[questionIndex][itemIndex].map((result: number) => (
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
