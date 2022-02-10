import { EditorState } from 'draft-js'
import { Language, Features, Qualtrics, Methods, LikertItems } from './survey-base'

export type SurveyForm = {
  setup: {
    topic: string
    method: Methods | null
    credits?: number
    feedback?: {
      active: boolean
      questions: {
        id: string
        question: string
      }[]
    }
  }
  language: Language
  message?: {
    welcome: EditorState
    completion: EditorState
  }
  quadratic?: QuadraticQuestion[]
  conjoint?: ConjointQuestion[]
  likert?: LikertQuestions[]
  features?: Features
  qualtrics?: Qualtrics
  id?: string
}

type QuadraticQuestion = {
  id: string
  statement: EditorState
}

type LikertQuestions = {
  id?: string
  statement: EditorState
  items: LikertItems[]
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
