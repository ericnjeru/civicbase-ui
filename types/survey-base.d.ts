export interface Survey {
  setup: Setup
  language: Language
  status: Status
}

export type Status = 'pilot' | 'published' | 'finished'

export type Methods = 'Likert' | 'Quadratic' | 'Conjoint'

export type Setup = {
  topic: string
  method: Methods
  credits?: number
  feedback?: {
    active: boolean
    questions: {
      id: string
      question: string
    }[]
  }
}

export type Language = {
  token: string
  thumbsUp?: string
  thumbsDown?: string
  jargon: string
  customToken?: string
}

export type Message = {
  welcome?: string
  completion?: string
}

export type Quadratic = {
  id?: string
  statement: string
}

export type Likert = {
  id?: string
  statement: string
  items: LikertItems[]
}

export type LikertItems = {
  description: string
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

export type Features = {
  multipleAnswerFromSameSource?: boolean
  qualtrics?: boolean
  randomQuestions?: boolean
  userIdentification?: boolean
}

export type Qualtrics = {
  link: string
}

type AnalyticStats = {
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

export type Analytics = {
  pilot: AnalyticStats
  published: AnalyticStats
}

// TODO: This is the quadratic, being use inside  qudratic use hook. Sort it out

// TODO: rename:
export type QuadraticForSurvey = {
  id: string
  statement: string
}

export type ConjointQuestions = {
  id: string
  statement: string
  attributes: ConjointAttributes[]
  items: ConjointItems[]
  selected?: string
}

export type LikertQuestions = {
  id: string
  statement: string
  item: {
    description: string
    vote: number
  }[]
}

type ConjointItems = {
  id: string
  [key: string]: string
}
