import { ComponentStory, ComponentMeta } from '@storybook/react'
import { survey, answers } from 'test/sample'

import AnswerTable from './AnswerTable'

export default {
  title: 'Features/Analytics/AnswerTable',
  component: AnswerTable,
} as ComponentMeta<typeof AnswerTable>

const Template: ComponentStory<typeof AnswerTable> = (args) => (
  <div style={{ width: 900 }}>
    <AnswerTable {...args} />
  </div>
)

export const Basic = Template.bind({})

Basic.args = { survey, answers }
