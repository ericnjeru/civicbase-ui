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
// TODO: conjoint

export type Status = 'pilot' | 'published' | 'finished'

export type Methods = 'Linear' | 'Quadratic' | 'Conjoint'

export type Setup = {
  topic: string
  method: Methods
  credits: number
}

export type Language = {
  token: string
  thumbsUp: string
  thumbsDown: string
  jargon: string
}

export type Message = {
  welcome?: any
  completion?: any
}

export type Question = {
  id?: string
  statement: string
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
