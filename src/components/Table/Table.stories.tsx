import { ComponentMeta, ComponentStory } from '@storybook/react'
import tw from 'twin.macro'

import SkeletonTable from './Skeleton'
import * as Table from './index'

export default {
  title: 'Elements/Table',
  component: Table.Main,
} as ComponentMeta<typeof Table.Main>

const Template: ComponentStory<typeof Table.Main> = () => {
  return (
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
}

export const Basic = Template.bind({})

Basic.args = {}

export const SkeletonTemplace: ComponentStory<typeof SkeletonTable> = (args) => (
  <div css={tw`w-screen max-w-screen-lg`}>
    <SkeletonTable {...args} />
  </div>
)

export const Skeleton = SkeletonTemplace.bind({})

Skeleton.args = {
  cols: 2,
  rows: 2,
}
