import * as Table from 'components/Table'

const AnswerTable = () => {
  return (
    <Table.Main>
      <Table.Head>
        <Table.Row>
          <Table.Header></Table.Header>
          <Table.Header>User Id</Table.Header>
          <Table.Header>QV1</Table.Header>
          <Table.Header>QV2</Table.Header>
          <Table.Header>QV3</Table.Header>
          <Table.Header>Credits left</Table.Header>
        </Table.Row>
      </Table.Head>

      <Table.Body>
        <Table.Row>
          <Table.Data>#1</Table.Data>
          <Table.Data>32374</Table.Data>
          <Table.Data>5</Table.Data>
          <Table.Data>0</Table.Data>
          <Table.Data>-3</Table.Data>
          <Table.Data>0</Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>#2</Table.Data>
          <Table.Data>35574</Table.Data>
          <Table.Data>5</Table.Data>
          <Table.Data>0</Table.Data>
          <Table.Data>-3</Table.Data>
          <Table.Data>0</Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>#3</Table.Data>
          <Table.Data>27674</Table.Data>
          <Table.Data>5</Table.Data>
          <Table.Data>0</Table.Data>
          <Table.Data>-3</Table.Data>
          <Table.Data>0</Table.Data>
        </Table.Row>
      </Table.Body>
    </Table.Main>
  )
}

export default AnswerTable
