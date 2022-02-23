import { FC, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import useAsync from 'hooks/use-async'
import { analytics } from 'services/survey'
import * as Analytics from 'features/Analytics'
import AnalyticsLayout from 'layouts/Analytics'
import { surveyMethods } from 'utilities/constants'

const AnalyticsPage: FC<RouteComponentProps> = ({ location }) => {
  const surveyId = location?.pathname.split('analytics/').pop()
  const { run, data, isError, isLoading } = useAsync()

  useEffect(() => {
    if (surveyId) {
      run(analytics(surveyId))
    }
  }, [run, surveyId])

  if (isError) {
    return <Analytics.Error />
  }

  const survey = data?.survey
  const answers = data?.answers

  return (
    <AnalyticsLayout
      isLoading={isLoading}
      survey={survey}
      answers={answers}
      header={<Analytics.Header />}
      status={<Analytics.Status />}
    >
      {!isLoading && survey?.setup?.method === surveyMethods.Quadratic && (
        <Analytics.Quadratic survey={survey} answers={answers} />
      )}

      {!isLoading && survey?.setup?.method === surveyMethods.Likert && (
        <Analytics.Likert survey={survey} answers={answers} />
      )}

      {!isLoading && survey?.setup?.method === surveyMethods.Conjoint && (
        <Analytics.Conjoint survey={survey} answers={answers} />
      )}

      {isLoading && <Analytics.Loader />}
    </AnalyticsLayout>
  )
}

export default AnalyticsPage
