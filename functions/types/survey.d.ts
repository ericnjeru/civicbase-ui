import { CreateSurvey } from '../../types/survey'
import { Methods, Survey } from '../../types/survey-base'

export type CreateRequest = {
  body: CreateSurvey
  [key: string]: any // not happy with this, but the only way I found so far to add user to the request
}

export type CreateAnswerRequest = {
  body: {
    surveyId: string
    quadratic?: QuadraticAnswer[]
    conjoint?: ConjointAnswer[]
    researcherId: string
    status: string
    time: {
      startAt: string
      submitedAt: string
      pageLoadAt: string
      questionPageLoadAt: string
    }
    leftCredits: number
    userId?: string
  }
}

type ConjointAnswer = {
  id: string
  statement: string
  selected: string
}

type QuadraticAnswer = {
  id: string
  statement: string
  vote: number
  credits: number
}
