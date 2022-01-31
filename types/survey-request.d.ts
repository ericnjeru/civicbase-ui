import { Setup, Language, Message, Question, Features, Qualtrics } from './survey'

export interface SurveyRequest {
  setup: Setup
  language: Language
  message?: Message
  questions?: Question[]
  features?: Features
  qualtrics?: Qualtrics
  id?: string
  conjoint?: any
}
