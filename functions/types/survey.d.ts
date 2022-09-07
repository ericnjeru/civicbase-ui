import { CreateSurvey } from '../../types/survey'
import { ConjointItems, Features, Language, LikertItems, Message, Setup } from '../../types/survey-base'

type AuthRequest = {
  uid: string
  email: string
  token: string
}

export type CreateSurveyRequest = {
  body: QVSurveyRequest | LikertSurveyRequest | ConjointSurveyRequest
  user?: AuthRequest
}

export type CreateAnswerRequest = {
  body: {
    surveyId: string
    quadratic?: QuadraticAnswer[]
    conjoint?: ConjointAnswer[]
    researcherId: string
    status: 'pilot' | 'published'
    time: {
      startAt: string
      submitedAt: string
      pageLoadAt: string
      questionPageLoadAt: string
    }
    leftCredits: number
    userId?: string
  }
}

type ConjointAnswer = {
  id: string
  statement: string
  selected: string
}

type QuadraticAnswer = {
  id: string
  statement: string
  vote: number
  credits: number
}

type Survey = {
  features: Features
  message: Message
  setup: Setup
}

interface QVSurveyRequest extends Survey {
  quadratic: { statement: string }[]
  language: Language
}

interface LikertSurveyRequest extends Survey {
  likert: {
    statement: string
    items: LikertItems[]
  }[]
}

interface ConjointSurveyRequest extends Survey {
  conjoint: {
    statement: string
    attributes: {
      name: string
      key: string
    }[]
    items: {
      [key: string]: string | number
    }[]
  }[]
}
