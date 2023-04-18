import { useEffect, useState } from 'react'

import { getSurvey } from 'services/survey'

import { SurveyRespondent } from '../../types/survey'
import useAsync from './use-async'

type UseSurvey = {
  isTaken: boolean
  survey: SurveyRespondent
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
}

const useSurvey = (surveyId?: string): UseSurvey => {
  const [isTaken, setTaken] = useState(false)
  const { run, data: survey, isLoading, isError, isSuccess } = useAsync()

  useEffect(() => {
    if (surveyId) {
      run(getSurvey(surveyId))
    }
  }, [run, surveyId])

  useEffect(() => {
    const item = window.localStorage.getItem('__civicbase_taken_surveys__')
    if (item) {
      const takenSurveys: string[] = JSON.parse(item) || []
      setTaken(() => !!takenSurveys.find((id) => id === surveyId))
    }
  }, [surveyId, setTaken])

  const isSurveyTaken = () =>
    (survey?.features.totalObservations || !survey?.features.multipleAnswerFromSameSource) && isTaken

  return {
    isTaken: isSurveyTaken(),
    survey,
    isSuccess,
    isLoading,
    isError,
  }
}

export default useSurvey
