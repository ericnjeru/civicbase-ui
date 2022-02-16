import { QuadraticQuestions, Status, ConjointQuestions, LikertQuestions } from './survey-base'

// TODO: there 2 types of answer one when you create answer and the other one when you get from db
type Answer = {
  surveyId: string
  researcherId: string
  status: Status
  time: Time
  leftCredits?: number
  feedback?: {
    answer: string
  }[]
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
  startAt: string | null
  surveyLoadAt: string | null
  questionPageLoadAt: string | null
}

type Feedback = {
  answer: string
  id: string
}

export interface QuadraticAnswer extends Answer {
  questions: QuadraticQuestions[]
  createdAt: string
  time: {
    submitedAt: string
    startAt: string
    surveyLoadAt: string
    questionPageLoadAt: string
  }
  feedback?: Feedback[]
}

export interface LikertAnswer extends Answer {
  questions: LikertQuestions[]
  feedback?: Feedback[]
}

export interface ConjointAnswer extends Answer {
  questions: ConjointQuestions[]
  feedback?: Feedback[]
}
