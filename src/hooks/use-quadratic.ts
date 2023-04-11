import { useEffect, useState } from 'react'

import { createQuestions } from 'utilities/survey'

import { SurveyRespondent } from '../../types/survey'

type Question = {
  id: string
  statement: string
  vote: number
  userVote: number
  cost: number
  credits: number
  order: number
}

const useQuadratic = (survey: SurveyRespondent) => {
  const {
    setup: { credits },
    quadratic,
    costs,
  } = survey

  const [questions, setQuestions] = useState<Question[]>([])
  const [availableCredits, setAvailableCredits] = useState(credits || 0)

  const canVote = (index: number, vote: number) => {
    let simulatedCost = 0

    questions.forEach((q, i) => {
      const cost = q.cost ?? 1
      const absVote = Math.abs(vote)
      if (i === index) {
        simulatedCost += (q.userVote + absVote) * cost
      } else {
        simulatedCost += q.credits
      }
    })

    if (!credits) {
      return false
    }

    return simulatedCost <= credits
  }

  const vote = (index: number, vote: number) => {
    if (canVote(index, vote)) {
      setQuestions(
        questions.map((question, i) => {
          const cost = question.cost ?? 1
          const absVote = Math.abs(vote)
          return index === i
            ? {
                ...question,
                vote: question.vote + vote,
                userVote: question.userVote + absVote,
                credits: (question.userVote + absVote) * cost,
              }
            : question
        }),
      )
    }
  }

  //   Setup questions for survey
  useEffect(() => {
    if (quadratic) {
      setQuestions(createQuestions(quadratic, costs))
    }
  }, [quadratic, costs])

  //   Update available credits
  useEffect(() => {
    const totalCost = questions.reduce((cummulativeCost, question) => {
      const cost = question.cost ?? 1
      return cummulativeCost + question.userVote * cost
    }, 0)
    if (credits) {
      setAvailableCredits(credits - totalCost)
    }
  }, [questions, credits])

  return { canVote, vote, questions, availableCredits }
}

export default useQuadratic
