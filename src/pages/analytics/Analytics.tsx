import tw from 'twin.macro'
import { FC, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import useAsync from 'hooks/use-async'
import { analytics } from 'services/survey'
import * as Analytics from 'features/Analytics'

const AnalyticsPage: FC<RouteComponentProps> = ({ location }) => {
  const surveyId = location?.pathname.split('analytics/').pop()
  const { run, data, isLoading, isError } = useAsync()

  useEffect(() => {
    if (surveyId) {
      run(analytics(surveyId))
    }
  }, [run, surveyId])

  if (!data?.survey || isLoading) {
    return <Analytics.Loading />
  }

  if (isError) {
    return <Analytics.Error />
  }

  const { survey, answers } = data

  return (
    <>
      <Analytics.Header survey={survey} />

      <div css={tw`mt-24`}>
        <Analytics.Status survey={survey} />
      </div>

      {survey.setup.method === 'Quadratic' && (
        <div css={tw`mt-24`}>
          <Analytics.Quadratic.ResultTable survey={survey} answers={answers} />
        </div>
      )}

      {survey.setup.method === 'Quadratic' && (
        <div css={tw`mt-24`}>
          <Analytics.Quadratic.AnswerTable survey={survey} answers={answers} />
        </div>
      )}
    </>
  )
}

export default AnalyticsPage
