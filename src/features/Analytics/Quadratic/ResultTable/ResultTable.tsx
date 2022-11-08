import * as Table from 'components/Table'
import { useAnalytics } from 'contexts/analytics'
import tw from 'twin.macro'

import DownloadAnswers from '../DownloadAnswers'

const ResultTable = () => {
  const { results, mode } = useAnalytics()

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

          {mode === 'pilot' && Object.keys(results.pilot).length === 0 && (
            <Table.Row>
              <Table.Data colSpan={2}>No answers captured in Pilot phase</Table.Data>
            </Table.Row>
          )}

          {mode === 'published' && Object.keys(results.published).length === 0 && (
            <Table.Row>
              <Table.Data colSpan={2}>No answers captured in Published phase</Table.Data>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Main>
    </div>
  )
}

export default ResultTable
