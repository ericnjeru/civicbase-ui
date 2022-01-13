import { useEffect, useState } from 'react'
import { createQuestions } from 'utilities/survey'
import { QuestionForSurvey, Survey } from '../../../types/survey'

const Linear = (survey: Survey) => {
  const {
    setup: { credits },
    questions: originalQuestions,
  } = survey

  const [questions, setQuestions] = useState<QuestionForSurvey[]>([])
  const [availableCredits, setAvailableCredits] = useState(credits)

  const canVote = (index: number, vote: number) => {
    const simulatedCost = questions.reduce(
      (cost, question, i) => (index === i ? cost + Math.abs(question.vote + vote) : cost + Math.abs(question.vote)),
      0,
    )

    return simulatedCost <= credits
  }

  const vote = (index: number, vote: number) => {
    if (canVote(index, vote)) {
      setQuestions(
        questions.map((question, i) => {
          return index === i ? { ...question, vote: question.vote + vote, credits: question.vote + vote } : question
        }),
      )
    }
  }

  //   Setup questions for survey
  useEffect(() => {
    setQuestions(createQuestions(originalQuestions))
  }, [originalQuestions])

  //   Update available credits
  useEffect(() => {
    const totalCost = questions.reduce(
      (cost, question) => (question.vote < 0 ? cost + question.vote * -1 : cost + question.vote),
      0,
    )

    setAvailableCredits(credits - totalCost)
  }, [questions, credits])

  return { canVote, vote, questions, availableCredits }
}

export default Linear
