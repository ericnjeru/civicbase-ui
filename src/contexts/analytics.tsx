import useAsync from 'hooks/use-async'
import { createContext, ReactElement, useContext, useEffect, useState } from 'react'
import { analytics } from 'services/survey'
import { SurveyDashboard } from '../../types/survey'
import { AnswerResponse as Answer } from '../../types/answer'

interface Analytics {
  isLoading: boolean
  isError: boolean
  survey?: SurveyDashboard
  answers?: Answer<unknown>[]
  mode: 'pilot' | 'published'
}

interface AnalyticsContextProps extends Analytics {
  toggle: () => void
}

const initialData: AnalyticsContextProps = {
  isLoading: false,
  isError: false,
  mode: 'pilot',
  toggle: () => {},
}

const AnalyticsContext = createContext(initialData)

export const AnalyticsProvider = ({ ...props }): ReactElement => {
  const surveyId = location?.pathname.split('analytics/').pop()
  const [mode, setMode] = useState<'pilot' | 'published'>('pilot')
  const { run, data, isError, isLoading } = useAsync()

  useEffect(() => {
    if (surveyId) {
      run(analytics(surveyId))
    }
  }, [run, surveyId])

  useEffect(() => {
    setMode(data?.survey.status === 'published' ? 'published' : 'pilot')
  }, [data])

  const toggle = () => {
    setMode((mode) => (mode === 'published' ? 'pilot' : 'published'))
  }

  return (
    <AnalyticsContext.Provider
      value={{ survey: data?.survey, answers: data?.answers, isError, isLoading, mode, toggle }}
      {...props}
    />
  )
}

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext)

  if (context === undefined) {
    throw new Error('useAnalytics() must be use within a AnalyticsProvider')
  }

  return context
}
