import { SurveyDashboard } from '../../types/survey'

type SurveyAnalyticsReturn = {
  isAnalising: boolean
  pilot?: {
    totalAccess: number
    totalRespondents: number
    convertionRate: number
  }
  published?: {
    totalAccess: number
    totalRespondents: number
    convertionRate: number
  }
}

const useSurveyAnalytics = (survey?: SurveyDashboard): SurveyAnalyticsReturn => {
  if (!survey) {
    return { isAnalising: true }
  }

  const { pilot, published } = survey.analytics

  const calculateConvertionRate = (mode: 'pilot' | 'published') => {
    if (mode === 'pilot') {
      return pilot.current.access > 0 ? Math.trunc((pilot.current.respondents / pilot.current.access) * 100) : 0
    } else {
      return published.current.access > 0
        ? Math.trunc((published.current.respondents / published.current.access) * 100)
        : 0
    }
  }

  return {
    isAnalising: false,
    pilot: {
      totalAccess: pilot.current.access,
      totalRespondents: pilot.current.respondents,
      convertionRate: calculateConvertionRate('pilot'),
    },
    published: {
      totalAccess: published.current.access,
      totalRespondents: published.current.respondents,
      convertionRate: calculateConvertionRate('published'),
    },
  }
}

export default useSurveyAnalytics
