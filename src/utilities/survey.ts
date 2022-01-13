import { Question } from '../../types/survey.d'

export const createQuestions = (questions: Question[]) => {
  return questions.map((question) => ({
    ...question,
    vote: 0,
    credits: 0,
  }))
}
