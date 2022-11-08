import { Analytics, Conjoint, Message, Status, Survey, Likert } from './survey-base'

export interface SurveyRespondent extends Survey {
  message?: Message
  id: string
  uid: string
  status: Status
  quadratic?: {
    id: string
    statement: string
  }[]
  conjoint?: Conjoint[]
  likert?: Likert[]
}

export interface CreateSurvey extends Survey {
  message?: Message
  quadratic?: {
    statement: string
  }[]
  conjoint?: Conjoint[]
}

export interface EditSurvey extends Survey {
  id?: string
  message?: Message
  quadratic?: {
    id: string
    statement: string
  }[]
  conjoint?: Conjoint[]
  likert?: Likert[]
}

export interface SurveyDashboard extends Survey {
  message?: Message
  id: string
  uid: string
  status: Status
  quadratic?: {
    id: string
    statement: string
  }[]
  conjoint?: Conjoint[]
  likert?: Likert[]
  analytics: Analytics
  createdAt: string
}
