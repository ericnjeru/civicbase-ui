import { FC } from 'react'
import { RouteComponentProps } from '@reach/router'
import * as Analytics from 'features/Analytics'
import AnalyticsLayout from 'layouts/Analytics'
import { AnalyticsProvider } from 'contexts/analytics'

const AnalyticsPage: FC<RouteComponentProps> = () => {
  return (
    <AnalyticsProvider>
      <AnalyticsLayout header={<Analytics.Header />} status={<Analytics.Status />} />
    </AnalyticsProvider>
  )
}

export default AnalyticsPage
