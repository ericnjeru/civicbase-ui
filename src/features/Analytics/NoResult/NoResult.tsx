import * as Table from 'components/Table'
import Typography from 'components/Typography'
import tw from 'twin.macro'

const NoResult = ({ title, description }: { title: string; description: string }) => {
  return (
    <Table.Main>
      <Table.Head>
        <Table.Row>
          <Table.Header css={tw`text-center`}>{title}</Table.Header>
        </Table.Row>
      </Table.Head>

      <Table.Body>
        <Typography css={tw`m-4 text-center`}>{description}</Typography>
      </Table.Body>
    </Table.Main>
  )
}

export default NoResult
