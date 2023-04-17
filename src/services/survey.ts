import { AnswerRequest, PricedAnswerRequest } from '../../types/answer'
import { SurveyRequest } from '../../types/survey-request'
import client from './api'

export const createSurvey = (form: SurveyRequest) => client('survey', { body: form })
export const editSurvey = (form: SurveyRequest, surveyId: string) =>
  client(`survey/${surveyId}`, { body: form, method: 'PUT' })
export const getSurveys = () => client('surveys')
export const publish = (surveyId: string) => client(`publishSurvey/${surveyId}`)
export const finish = (surveyId: string) => client(`finishSurvey/${surveyId}`)
export const clone = (surveyId: string) => client(`cloneSurvey/${surveyId}`)
export const deleteSurvey = (surveyId: string) => client(`survey/${surveyId}`, { method: 'DELETE' })
export const getSurvey = (surveyId: string) => client(`survey/${surveyId}`)
export const createAnswer = (answer: AnswerRequest<unknown>) => client('answer', { body: answer })
export const createPricedAnswer = (answer: PricedAnswerRequest<unknown>) => client('answer', { body: answer })
export const analytics = (surveyId: string) => client(`surveyAnalytics/${surveyId}`)
