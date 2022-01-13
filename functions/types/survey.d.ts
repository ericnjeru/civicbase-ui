import { Survey } from '../../types/survey'

export type CreateRequest = {
  body: Survey
  [key: string]: any // not happy with this, but the only way I found so far to add user to the request
}

export type CreateAnswerRequest = {
  body: {
    surveyId: string
    questions: AnswerQuestion[]
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

type AnswerQuestion = {
  id: string
  statement: string
  vote: number
  credits: number
}
