// TODO: delete
import { Message, Features, Qualtrics, Status, Methods, Quadratic, Language, Priced } from './survey-base'

export interface Survey {
  setup: Setup
  language: Language
  message?: Message
  quadratic: Quadratic[]
  priced: Priced[]
  features?: Features
  qualtrics?: Qualtrics
  id: string
  createdAt: string
  uid: string
  status: Status
  publishedAt?: string
  finishedAt?: string
  conjoint?: any
}

type Setup = {
  topic: string
  method: Methods
  credits: number
  feedback?: {
    active: boolean
    question: string
  }
}
