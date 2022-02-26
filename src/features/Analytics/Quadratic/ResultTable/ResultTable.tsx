import tw from 'twin.macro'
import * as Table from 'components/Table'
import DownloadAnswers from '../DownloadAnswers'
import { useAnalytics } from 'contexts/analytics'

const ResultTable = () => {
  const { results, mode } = useAnalytics()

  console.log('mode', mode)

  return (
    <div>
      <div css={tw`flex justify-end items-center mb-4`}>
        <DownloadAnswers />
      </div>

      <Table.Main>
        <Table.Head>
          <Table.Row>
            <Table.Header>Question Id</Table.Header>
            <Table.Header>Result</Table.Header>
          </Table.Row>
        </Table.Head>

        <Table.Body>
          {mode === 'pilot' &&
            Object.keys(results.pilot)
              .sort()
              .map((row) => (
                <Table.Row key={row}>
                  <Table.Data>{row}</Table.Data>
                  <Table.Data>{results.pilot[row]}</Table.Data>
                </Table.Row>
              ))}

          {mode === 'published' &&
            Object.keys(results.published)
              .sort()
              .map((row) => (
                <Table.Row key={row}>
                  <Table.Data>{row}</Table.Data>
                  <Table.Data>{results.published[row]}</Table.Data>
                </Table.Row>
              ))}
        </Table.Body>
      </Table.Main>
    </div>
  )
}

export default ResultTable
