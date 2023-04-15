// TODO: delete
import { Setup, Language, Message, Qualtrics, Conjoint, Likert } from './survey-base'

type Question = {
  id?: string
  statement: string
}
export type Features = {
  multipleAnswerFromSameSource?: boolean
  totalObservations?: number
  priced?: string
  qualtrics?: boolean
  randomQuestions?: boolean
  userIdentification?: boolean
}
export interface SurveyRequest {
  setup: Setup
  language?: Language
  message?: Message
  quadratic?: Question[]
  priced?: Question[]
  conjoint?: Conjoint[]
  likert?: Likert[]
  features?: Features
  qualtrics?: Qualtrics
  id?: string
}
