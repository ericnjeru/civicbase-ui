import { Survey } from '../../types/survey'

type SurveyAnalyticsReturn = {
  isAnalising: boolean
  totalAccess?: number
  totalRespondents?: number
  accessIncrement?: number
  respondentsIncrement?: number
  convertionRate?: number
  convertionIncrement?: number
}

const useSurveyAnalytics = (survey?: Survey): SurveyAnalyticsReturn => {
  if (!survey) {
    return { isAnalising: true }
  }

  const { current, history } = survey.analytics
  const calculate = (increment: 'access' | 'respondents') => {
    if (history.access === 0) {
      return current[increment] * 100
    }

    if (current[increment] === history[increment]) {
      return 0
    }

    const diff = current[increment] - history[increment]

    return Math.trunc((diff / history[increment]) * 100)
  }

  const getConvertionRate = () => Math.trunc((current.respondents / current.access) * 100)
  const getConvertionIncrement = () => {
    if (current.access <= 0 || history.access <= 0) {
      return 0
    }

    const c = (current.respondents / current.access) * 100
    const p = (history.respondents / history.access) * 100

    return Number((c - p).toFixed(2))
  }

  return {
    isAnalising: false,
    totalAccess: current.access,
    totalRespondents: current.respondents,
    accessIncrement: calculate('access'),
    respondentsIncrement: calculate('respondents'),
    convertionRate: getConvertionRate(),
    convertionIncrement: getConvertionIncrement(),
  }
}

export default useSurveyAnalytics
