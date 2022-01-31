import { EditorState } from 'draft-js'
import { Setup, Language, Question, Features, Qualtrics } from './survey'

export type SurveyForm = {
  setup: Setup
  language: Language
  message: Message
  questions?: Question[]
  features?: Features
  qualtrics?: Qualtrics
  conjoint?: Conjoint
  id?: string
}

type Message = {
  welcome: EditorState
  completion: EditorState
}
