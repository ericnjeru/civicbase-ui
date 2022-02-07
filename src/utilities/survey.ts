import { QuadraticForSurvey } from '../../types/survey-base'

export const createQuestions = (questions: QuadraticForSurvey[]) => {
  return questions
    .map((question) => ({
      ...question,
      vote: 0,
      credits: 0,
    }))
    .sort(() => 0.5 - Math.random())
    .map((question, index) => ({ ...question, order: index }))
}
