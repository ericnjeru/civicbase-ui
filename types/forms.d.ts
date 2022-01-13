import { Setup, Language, Message, Question, Features, Qualtrics } from './survey'

export type SurveyForm = {
  setup: Setup
  language: Language
  message?: Message
  questions: Question[]
  features?: Features
  qualtrics?: Qualtrics
}
