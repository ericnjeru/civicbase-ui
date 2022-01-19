import { Status } from './survey.d'

// TODO: there 2 types of answer one when you create answer and the other one when you get from db
export type Answer = {
  surveyId: string
  questions: Question[]
  researcherId: string
  status: Status
  time: Time
  leftCredits: number
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
