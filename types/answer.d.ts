import { Status } from './survey.d'

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
