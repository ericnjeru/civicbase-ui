// TODO: delete
import { Setup, Language, Message, Features, Qualtrics, Conjoint, Likert } from './survey-base'

type Question = {
  id?: string
  statement: string
}
export interface SurveyRequest {
  setup: Setup
  language: Language
  message?: Message
  quadratic?: Question[]
  conjoint?: Conjoint[]
  likert?: Likert[]
  features?: Features
  qualtrics?: Qualtrics
  id?: string
}
