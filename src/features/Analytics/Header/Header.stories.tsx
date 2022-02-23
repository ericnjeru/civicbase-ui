import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AnalyticsProvider } from 'contexts/analytics'
import { survey } from 'test/sample'

import Header from './Header'

export default {
  title: 'Features/Analytics/Header',
  component: Header,
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = () => (
  <div style={{ width: 900 }}>
    <AnalyticsProvider survey={survey}>
      <Header />
    </AnalyticsProvider>
  </div>
)

export const Basic = Template.bind({})

Basic.args = {}
