import { ComponentStory, ComponentMeta } from '@storybook/react'
import { survey } from 'test/sample'

import Header from './Header'

export default {
  title: 'Features/Analytics/Header',
  component: Header,
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = (args) => (
  <div style={{ width: 900 }}>
    <Header {...args} />
  </div>
)

export const Basic = Template.bind({})

Basic.args = { survey }
