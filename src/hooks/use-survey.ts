import { useEffect, useState } from 'react'

import { getSurvey } from 'services/survey'

import { SurveyRespondent } from '../../types/survey'
import useAsync from './use-async'

type UseSurvey = {
  isTaken: boolean
  currentObservation: number
  totalObservations: number
  survey: SurveyRespondent
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
}

const useSurvey = (surveyId?: string): UseSurvey => {
  const [isTaken, setTaken] = useState(false)
  const [currentObservation, setCurrentObservation] = useState(1)
  const [totalObservations, setTotalObservations] = useState(1)
  const { run, data: survey, isLoading, isError, isSuccess } = useAsync()

  useEffect(() => {
    if (surveyId) {
      run(getSurvey(surveyId))
    }
  }, [run, surveyId])

  useEffect(() => {
    const item = window.localStorage.getItem('__civicbase_taken_surveys__')
    const totalObservations = survey?.features.totalObservations ? survey?.features.totalObservations : 1
    if (item) {
      const takenSurveys: string[] = JSON.parse(item) || []
      const similarSurveys: string[] = takenSurveys.filter((id) => id === surveyId)
      setTaken(() => !(similarSurveys.length < totalObservations))
      setCurrentObservation(similarSurveys.length + 1)
    }
    setTotalObservations(totalObservations)
  }, [surveyId, setTaken, survey?.features.totalObservations])

  const isSurveyTaken = () => survey?.features.multipleAnswerFromSameSource && isTaken

  return {
    isTaken: isSurveyTaken(),
    currentObservation,
    totalObservations,
    survey,
    isSuccess,
    isLoading,
    isError,
  }
}

export default useSurvey
