import Quadratic from './quadratic'
import Likert from './likert'
import Conjoint from './conjoint'
import { QuestionForSurvey } from '../../../types/survey-base'
import { SurveyRespondent } from '../../../types/survey'

const methods = {
  Quadratic,
  Likert,
  Conjoint,
}

type UseMethod = {
  canVote: (index: number, vote: number) => boolean
  vote: (index: number, vote: number) => void
  questions: QuestionForSurvey[]
  availableCredits: number
}

const useMethod = (survey: SurveyRespondent): UseMethod => {
  const { method } = survey.setup

  return methods[method](survey)
}

export default useMethod
