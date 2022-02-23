import { ComponentMeta, ComponentStory } from '@storybook/react'
import { survey } from 'test/sample'
import Status from './Status'

export default {
  title: 'Features/Analytics/Status',
  component: Status,
} as ComponentMeta<typeof Status>

const Template: ComponentStory<typeof Status> = (args) => {
  return (
    <div style={{ width: 900 }}>
      <Status {...args} />
    </div>
  )
}

export const Basic = Template.bind({})

Basic.args = {
  survey,
}
