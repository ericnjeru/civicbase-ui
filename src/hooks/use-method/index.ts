import Quadratic from './quadratic'
import Linear from './linear'
import Conjoint from './conjoint'
import { Survey, QuestionForSurvey } from '../../../types/survey'

const methods = {
  Quadratic,
  Linear,
  Conjoint,
}

type UseMethod = {
  canVote: (index: number, vote: number) => boolean
  vote: (index: number, vote: number) => void
  questions: QuestionForSurvey[]
  availableCredits: number
}

const useMethod = (survey: Survey): UseMethod => {
  const { method } = survey.setup

  return methods[method](survey)
}

export default useMethod
