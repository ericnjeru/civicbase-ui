import { useEffect, useState } from 'react'

import { createPricedQuestions } from 'utilities/survey'

import { SurveyRespondent } from '../../types/survey'

type Question = {
  id: string
  statement: string
  vote: number
  preVotes: number
  userVotes: number
  cost: number
  credits: number
  order: number
}

const usePriced = (survey: SurveyRespondent, currentObservation: number) => {
  const {
    setup: { credits },
    priced,
    features,
  } = survey

  const [questions, setQuestions] = useState<Question[]>([])
  const [availableCredits, setAvailableCredits] = useState(credits || 0)

  const canVote = (index: number, vote: number) => {
    let simulatedCost = 0

    questions.forEach((q, i) => {
      const cost = q.cost ?? 1
      const absVote = Math.abs(vote)
      if (i === index) {
        simulatedCost += (q.userVotes + absVote) * cost
      } else {
        simulatedCost += q.credits
      }
    })

    if (!credits) {
      return false
    }

    return simulatedCost <= credits
  }

  const calculateCredits = (userVotes: number, cost: number, absVote: number, votes: number, preVotes: number) => {
    if (votes === preVotes) {
      return userVotes * cost
    }
    const credits: number = (userVotes + absVote) * cost
    return credits
  }
  const calculateUserVotes = (userVotes: number, absVote: number, votes: number, preVotes: number) => {
    if (votes === preVotes) {
      return userVotes
    }
    return userVotes + absVote
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
                userVotes: calculateUserVotes(question.userVotes, absVote, question.vote + vote, question.preVotes),
                credits: calculateCredits(question.userVotes, cost, absVote, question.vote + vote, question.preVotes),
              }
            : question
        }),
      )
    }
  }

  //   Setup questions for survey
  useEffect(() => {
    if (priced) {
      const costs = features?.priced ? JSON.parse(features?.priced) : []
      setQuestions(createPricedQuestions(priced, currentObservation, costs))
    }
  }, [currentObservation, features?.priced, priced])

  //   Update available credits
  useEffect(() => {
    const totalCost = questions.reduce((cummulativeCost, question) => {
      const cost = question.cost ?? 1
      return cummulativeCost + question.userVotes * cost
    }, 0)
    if (credits) {
      setAvailableCredits(credits - totalCost)
    }
    console.log(currentObservation)
    console.log(questions)
  }, [questions, credits, currentObservation])

  return { canVote, vote, questions, availableCredits }
}

export default usePriced
