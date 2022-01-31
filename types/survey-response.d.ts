import { Message, Question, Features, Qualtrics, Analytics, Status, Methods } from './survey'

export interface Survey {
  setup: Setup
  language: Language
  message?: Message
  questions: Question[]
  features?: Features
  qualtrics?: Qualtrics
  analytics: Analytics
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
