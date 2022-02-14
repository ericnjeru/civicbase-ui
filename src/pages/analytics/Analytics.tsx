import tw from 'twin.macro'
import { FC, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import useAsync from 'hooks/use-async'
import { analytics } from 'services/survey'
import * as Analytics from 'features/Analytics'
import AnalyticsLayout from 'layouts/Analytics'

const AnalyticsPage: FC<RouteComponentProps> = ({ location }) => {
  const surveyId = location?.pathname.split('analytics/').pop()
  const { run, data, isLoading, isError } = useAsync()

  useEffect(() => {
    if (surveyId) {
      run(analytics(surveyId))
    }
  }, [run, surveyId])

  if (isError) {
    return <Analytics.Error />
  }

  if (!data?.survey || isLoading) {
    return <Analytics.Loading />
  }

  const { survey, answers } = data

  return (
    <AnalyticsLayout
      header={<Analytics.Header survey={survey} />}
      status={
        <div css={tw`mt-24`}>
          <Analytics.Status survey={survey} />
        </div>
      }
    >
      {survey.setup.method === 'Quadratic' && <Analytics.Quadratic survey={survey} answers={answers} />}
    </AnalyticsLayout>
  )
}

export default AnalyticsPage
