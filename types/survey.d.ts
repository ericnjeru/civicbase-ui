export interface Survey {
  setup: Setup
  language: Langage
  message?: Message
  questions: Question[]
  features?: Features
  qualtrics?: Qualtrics
  analytics: Analytics
  id?: string
  createdAt?: string
  uid?: string
  status?: 'pilot' | 'published' | 'finished'
}

export type Setup = {
  topic: string
  function: 'linear' | 'quadratic'
  credits: number
}

export type Langage = {
  token: string
  jargon: {
    thumbsUp: string
    thumbsDown: string
  }
}

export type Message = {
  welcome?: string
  completion?: string
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
}
