import { ComponentMeta, ComponentStory } from '@storybook/react'
import { AnalyticsProvider } from 'contexts/analytics'
import { survey } from 'test/sample'
import Status from './Status'

export default {
  title: 'Features/Analytics/Status',
  component: Status,
} as ComponentMeta<typeof Status>

const Template: ComponentStory<typeof Status> = () => {
  return (
    <div style={{ width: 900 }}>
      <AnalyticsProvider survey={survey}>
        <Status />
      </AnalyticsProvider>
    </div>
  )
}

export const Basic = Template.bind({})

Basic.args = {}
