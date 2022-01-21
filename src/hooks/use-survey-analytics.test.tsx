import { survey } from 'test/sample'
import useSurveyAnalytics from './use-survey-analytics'

describe('useSurveyAnalytics', () => {
  it('should calculate access', () => {
    const { totalAccess, accessIncrement } = useSurveyAnalytics(survey)

    const diff = survey.analytics.current.access - survey.analytics.history.access
    const percentage = Math.trunc((diff / survey.analytics.history.access) * 100)

    expect(totalAccess).toBe(survey.analytics.current.access)
    expect(accessIncrement).toBe(percentage)
  })

  it('should calculate respondents', () => {
    const { totalRespondents, respondentsIncrement } = useSurveyAnalytics(survey)

    const diff = survey.analytics.current.respondents - survey.analytics.history.respondents
    const percentage = Math.trunc((diff / survey.analytics.history.respondents) * 100)

    expect(totalRespondents).toBe(survey.analytics.current.respondents)
    expect(respondentsIncrement).toBe(percentage)
  })

  it('should calculate convertion rate', () => {
    const { convertionIncrement, convertionRate } = useSurveyAnalytics(survey)
    const currentRate = (survey.analytics.current.respondents / survey.analytics.current.access) * 100
    const prevRate = (survey.analytics.history.respondents / survey.analytics.history.access) * 100
    const increment = Number((currentRate - prevRate).toFixed(2))

    expect(convertionRate).toBe(Math.trunc(currentRate))
    expect(convertionIncrement).toBe(increment)
  })
})
