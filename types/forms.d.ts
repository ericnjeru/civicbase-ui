import { Setup, Langage, Message, Question, Features, Qualtrics } from './survey'

export type SurveyForm = {
  setup: Setup
  language: Langage
  message?: Message
  questions: Question[]
  features?: Features
  qualtrics?: Qualtrics
}
