import * as Table from 'components/Table'

const SurveyTable = () => {
  return (
    <Table.Main>
      <Table.Head>
        <Table.Row>
          <Table.Header>Question Id</Table.Header>
          <Table.Header>Agree</Table.Header>
          <Table.Header>Disagree</Table.Header>
          <Table.Header>Total</Table.Header>
        </Table.Row>
      </Table.Head>

      <Table.Body>
        <Table.Row>
          <Table.Data>QV1</Table.Data>
          <Table.Data>5</Table.Data>
          <Table.Data>5</Table.Data>
          <Table.Data>0</Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>QV2</Table.Data>
          <Table.Data>0</Table.Data>
          <Table.Data>3</Table.Data>
          <Table.Data>-3</Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>QV3</Table.Data>
          <Table.Data>0</Table.Data>
          <Table.Data>3</Table.Data>
          <Table.Data>-3</Table.Data>
        </Table.Row>
      </Table.Body>
    </Table.Main>
  )
}

export default SurveyTable
