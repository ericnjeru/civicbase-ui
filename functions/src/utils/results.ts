import { AnswerResponse as Answer, Likert, Quadratic } from '../../../types/answer'
import { SurveyDashboard } from '../../../types/survey'

type Result = {
  pilot: {
    [key: string]: number
  }
  published: {
    [key: string]: number
  }
}

type QuadraticAnswer = {
  status: 'pilot' | 'published'
  questions: {
    id: string
    vote: number
  }[]
}

export function getResults(survey: SurveyDashboard, answers: Answer<unknown>) {
  switch (survey.setup.method) {
    case 'Quadratic':
      return calculateQuadratic(answers as Answer<Quadratic>)

    case 'Conjoint':
      return calculateConjoint()

    case 'Likert':
      return calculateLikert(survey, answers as Answer<Likert>)
  }
}

const calculateConjoint = () => {
  return []
}

const calculateLikert = (survey: SurveyDashboard, answers: Answer<Likert>) => {
  const resultMatrix = survey.likert?.map((question) => {
    const matrix: number[][] = []

    question.items.forEach(() => {
      matrix.push([0, 0, 0, 0, 0])
    })

    return matrix
  })

  if (resultMatrix) {
    answers.forEach((answer: Answer<Likert>) => {
      answer.questions.forEach((question, questionIndex) => {
        question.item.forEach((item, itemIndex) => {
          resultMatrix[questionIndex][itemIndex][item.vote - 1]++
        })
      })
    })
  }

  return resultMatrix || []
}

const calculateQuadratic = (answers: Answer<Quadratic>) => {
  return answers.reduce(
    (results: Result, answer: QuadraticAnswer) => {
      answer.questions.forEach((question: any) => {
        if (question.id) {
          results[answer.status][question.id] = results[answer.status][question.id]
            ? results[answer.status][question.id] + question.vote
            : question.vote
        }
      })
      return results
    },
    {
      pilot: {},
      published: {},
    },
  )
}
