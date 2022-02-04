import { QuestionForSurvey, Status, ConjointQuestions } from './survey-base'

// TODO: there 2 types of answer one when you create answer and the other one when you get from db
type Answer = {
  surveyId: string
  researcherId: string
  status: Status
  time: Time
  leftCredits?: number
  feedback?: string
  [key: string]: any
}

type Question = {
  id?: string
  statement: string
  vote: number
  credits: number
}

type Time = {
  submitedAt: string
  startAt: string
  pageLoadAt: string | null
  questionPageLoadAt: string | null
}

export interface QuadraticAnswer extends Answer {
  questions: QuestionForSurvey[]
}

export interface ConjointAnswer extends Answer {
  questions: ConjointQuestions[]
}
