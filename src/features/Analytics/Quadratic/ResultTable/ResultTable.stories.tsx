import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AnalyticsProvider } from 'contexts/analytics'
import { answers } from 'test/sample'

import ResultTable from './ResultTable'

export default {
  title: 'Features/Analytics/ResultTable',
  component: ResultTable,
} as ComponentMeta<typeof ResultTable>

const Template: ComponentStory<typeof ResultTable> = (args) => (
  <div style={{ width: 900 }}>
    <AnalyticsProvider {...args}>
      <ResultTable />
    </AnalyticsProvider>
  </div>
)

export const Basic = Template.bind({})

Basic.args = { answers }
