import useAsync from 'hooks/use-async'
import { createContext, ReactElement, useContext, useEffect, useState } from 'react'
import { analytics } from 'services/survey'
import { SurveyDashboard } from '../../types/survey'

interface Analytics {
  isLoading: boolean
  isError: boolean
  survey?: SurveyDashboard
  csv?: any
  results?: any
  feedback?: any
  mode: 'pilot' | 'published'
}

interface AnalyticsContextProps extends Analytics {
  toggle: () => void
  hasAnswer?: () => boolean
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

  const hasAnswer = () => data?.results && !!data?.results[mode]

  return (
    <AnalyticsContext.Provider
      value={{
        survey: data?.survey,
        results: data?.results,
        csv: data?.csv,
        feedback: data?.feedback,
        isError,
        isLoading,
        mode,
        toggle,
        hasAnswer,
      }}
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
