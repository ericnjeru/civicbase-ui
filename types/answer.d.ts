import { Status, ConjointAttributes, ConjointItems } from './survey-base'

type ObservationAnswer<Type> = {
  leftCredits?: number
  currentObservation?: number
  time: Time
  questions: Type[]
  feedback?: Feedback[]
  [key: string]: any
}
type PricedAnswerRequest<Type> = {
  identifier: string
  surveyId: string
  status: Status
  observations: ObservationAnswer<Type>[]
}

type AnswerRequest<Type> = {
  surveyId: string
  status: Status
  leftCredits?: number
  time: Time
  questions: Type[]
  feedback?: Feedback[]
  [key: string]: any
}

type AnswerResponse<Type> = {
  createdAt: string
  questions: Type[]
  leftCredits?: number
  status: Status
  surveyId: string
  time: Time
  feedback?: Feedback[]
  [key: string]: any
}

type Time = {
  submitedAt: string
  startAt: string
  surveyLoadAt: string
  questionPageLoadAt: string
}

type Feedback = {
  answer: string
  id: string
}

type Quadratic = {
  id: string
  vote: number
  credits: number
  order: number
}

type Priced = {
  id: string
  vote: number
  credits: number
  order: number
}

type Conjoint = {
  id: string
  attributes: ConjointAttributes[]
  items: ConjointItems[]
  selected?: string
}

type Likert = {
  id: string
  item: LikertItem[]
}

type LikertItem = {
  description: string
  vote: number
}
