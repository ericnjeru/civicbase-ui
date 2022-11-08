import tw, { styled } from 'twin.macro'

import * as Table from './index'

const TextLine = styled.div(() => tw`bg-gray-200 rounded-full animate-pulse`)

const Skeleton = ({ cols, rows }: { cols: number; rows: number }) => {
  const columns = Array.from({ length: cols }, (v, k) => k + 1)
  const lines = Array.from({ length: rows }, (v, k) => k + 1)

  return (
    <Table.Main>
      <Table.Head>
        <Table.Row>
          {columns.map((key) => (
            <Table.Data key={key}>
              <TextLine css={tw`h-6 w-24`} />
            </Table.Data>
          ))}
        </Table.Row>
      </Table.Head>

      <Table.Body>
        {lines.map((rowKey) => (
          <Table.Row key={rowKey}>
            {columns.map((key) => (
              <Table.Data key={key}>
                <TextLine css={tw`h-6 w-24`} />
              </Table.Data>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Main>
  )
}

export default Skeleton
