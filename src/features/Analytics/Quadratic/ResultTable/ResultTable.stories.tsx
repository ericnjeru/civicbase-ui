import { ComponentStory, ComponentMeta } from '@storybook/react'
import { answers } from 'test/sample'

import ResultTable from './ResultTable'

export default {
  title: 'Features/Analytics/ResultTable',
  component: ResultTable,
} as ComponentMeta<typeof ResultTable>

const Template: ComponentStory<typeof ResultTable> = (args) => (
  <div style={{ width: 900 }}>
    <ResultTable {...args} />
  </div>
)

export const Basic = Template.bind({})

Basic.args = { answers }
