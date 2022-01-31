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
  conjoint?: Conjoint[]
}

export type Status = 'pilot' | 'published' | 'finished'

export type Methods = 'Linear' | 'Quadratic' | 'Conjoint'

export type Setup = {
  topic: string
  method: Methods | null
  credits: number
  feedback?: {
    active: boolean
    question: string
  }
}

export type Language = {
  token: string
  thumbsUp?: string
  thumbsDown?: string
  jargon: string
}

export type Message = {
  welcome?: string
  completion?: string
}

export type Question = {
  id?: string
  statement: any
}

export type Conjoint = {
  id?: string
  statement: string
  attributes: ConjointAttributes[]
  items: ConjointItems[]
}

export type ConjointAttributes = {
  id: string
  name: string
  key: string
}

type ConjointItems = {
  id: number
  [key: string]: string
}

export type Features = {
  qualtrics?: boolean
  userIdentification?: boolean
}

export type Qualtrics = {
  link: string
}

export type Analytics = {
  current: {
    respondents: number
    access: number
  }
  previous: {
    respondents: number
    access: number
  }
  history: {
    respondents: number
    access: number
  }
}

export interface QuestionForSurvey extends Question {
  vote: number
  credits: number
}
