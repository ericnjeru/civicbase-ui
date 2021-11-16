import { Meta } from '@storybook/react'
import * as Table from './index'
import tw from 'twin.macro'

export default {
  title: 'Elements/Table',
  component: Table.Main,
} as Meta

export const Basic = () => (
  <div css={tw`w-screen max-w-screen-lg`}>
    <Table.Main>
      <Table.Head>
        <Table.Row>
          <Table.Header>Name</Table.Header>
          <Table.Header>Title</Table.Header>
        </Table.Row>
      </Table.Head>

      <Table.Body>
        <Table.Row>
          <Table.Data>Alan</Table.Data>
          <Table.Data>MR</Table.Data>
        </Table.Row>
      </Table.Body>
    </Table.Main>
  </div>
)
