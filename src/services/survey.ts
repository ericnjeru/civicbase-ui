import client from './api'
import { Answer } from '../../types/answer.d'
import { SurveyRequest } from '../../types/survey-request'

export const createSurvey = (form: SurveyRequest) => client('createSurvey', { body: form })
export const editSurvey = (form: SurveyRequest, surveyId: string) => client(`updateSurvey/${surveyId}`, { body: form })
export const getSurveys = () => client('surveys')
export const publish = (surveyId: string) => client(`publish/${surveyId}`)
export const finish = (surveyId: string) => client(`finish/${surveyId}`)
export const clone = (surveyId: string) => client(`clone/${surveyId}`)
export const deleteSurvey = (surveyId: string) => client(`delete/${surveyId}`, { method: 'DELETE' })
export const getSurvey = (surveyId: string) => client(`survey/${surveyId}`)
export const createAnswer = (answer: Answer) => client('createAnswer', { body: answer })
export const analytics = (surveyId: string) => client(`analytics/${surveyId}`)
