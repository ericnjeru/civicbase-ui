import { useEffect } from 'react'
import { getSurvey } from 'services/survey'
import { Survey } from '../../types/survey-response'
import useAsync from './use-async'

type UseSurvey = {
  data: Survey
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
}

const useSurvey = (surveyId?: string): UseSurvey => {
  const { run, data, isLoading, isError, isSuccess } = useAsync()

  useEffect(() => {
    if (surveyId) {
      run(getSurvey(surveyId))
    }
  }, [run, surveyId])

  return {
    data,
    isSuccess,
    isLoading,
    isError,
  }
}

export default useSurvey
