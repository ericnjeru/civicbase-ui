import { QuadraticForSurvey } from '../../types/survey-base'

export const createQuestions = (questions: QuadraticForSurvey[]) => {
  return questions.map((question) => ({
    ...question,
    vote: 0,
    credits: 0,
  }))
}
