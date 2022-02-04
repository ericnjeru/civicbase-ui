import { useEffect, useState } from 'react'
import { createQuestions } from 'utilities/survey'
import { SurveyRespondent } from '../../../types/survey'
import { QuestionForSurvey } from '../../../types/survey-base'

// TODO:
const Likert = (survey: SurveyRespondent) => {
  const {
    setup: { credits },
    quadratic,
  } = survey

  const [questions, setQuestions] = useState<QuestionForSurvey[]>([])
  const [availableCredits, setAvailableCredits] = useState(credits || 0)

  const canVote = (index: number, vote: number) => {
    let simulatedCost = 0

    questions.forEach((q, i) => {
      if (i === index) {
        simulatedCost += Math.pow(q.vote + vote, 2)
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
          return index === i
            ? { ...question, vote: question.vote + vote, credits: Math.pow(question.vote + vote, 2) }
            : question
        }),
      )
    }
  }

  //   Setup questions for survey
  useEffect(() => {
    if (quadratic) {
      setQuestions(createQuestions(quadratic))
    }
  }, [quadratic])

  //   Update available credits
  useEffect(() => {
    const totalCost = questions.reduce((cost, question) => cost + Math.pow(question.vote, 2), 0)

    if (credits) {
      setAvailableCredits(credits - totalCost)
    }
  }, [questions, credits])

  return { canVote, vote, questions, availableCredits }
}

export default Likert
