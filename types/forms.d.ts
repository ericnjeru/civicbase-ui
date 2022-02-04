import { EditorState } from 'draft-js'
import { Language, Features, Qualtrics, Methods } from './survey-base'

export type SurveyForm = {
  setup: {
    topic: string
    method: Methods | null
    credits?: number
    feedback?: {
      active: boolean
      question: string
    }
  }
  language: Language
  message?: {
    welcome: EditorState
    completion: EditorState
  }
  quadratic?: QuadraticQuestion[]
  conjoint?: ConjointQuestion[]
  features?: Features
  qualtrics?: Qualtrics
  id?: string
}

type QuadraticQuestion = {
  id: string
  statement: EditorState
}

type ConjointQuestion = {
  id?: string
  statement: EditorState
  attributes: ConjointAttributes[]
  items: ConjointItems[]
}

type Message = {
  welcome: EditorState
  completion: EditorState
}
