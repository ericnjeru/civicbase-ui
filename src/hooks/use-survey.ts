import { useEffect } from 'react'
import { getSurvey } from 'services/survey'
import { SurveyRespondent } from '../../types/survey'
import useAsync from './use-async'

type UseSurvey = {
  data: SurveyRespondent
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
