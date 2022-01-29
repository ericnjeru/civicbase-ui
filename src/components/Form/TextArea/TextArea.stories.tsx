import { ComponentStory, ComponentMeta } from '@storybook/react'
import TextArea from './TextArea'

export default {
  title: 'Elements/TextArea',
  component: TextArea,
} as ComponentMeta<typeof TextArea>

const Template: ComponentStory<typeof TextArea> = () => (
  <div style={{ width: 900 }}>
    <TextArea rows={4} />
  </div>
)

export const Basic = Template.bind({})

Basic.args = {}
