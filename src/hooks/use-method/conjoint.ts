import { useEffect, useState } from 'react'
import { createQuestions } from 'utilities/survey'
import { QuestionForSurvey, Survey } from '../../../types/survey'

const Conjoint = (survey: Survey) => {
  const {
    setup: { credits },
    questions: originalQuestions,
  } = survey

  const [questions, setQuestions] = useState<QuestionForSurvey[]>([])
  const [availableCredits, setAvailableCredits] = useState(credits)

  const canVote = (index: number, vote: number) => {
    let simulatedCost = 0

    questions.forEach((q, i) => {
      if (i === index) {
        simulatedCost += Math.pow(q.vote + vote, 2)
      } else {
        simulatedCost += q.credits
      }
    })

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
    setQuestions(createQuestions(originalQuestions))
  }, [originalQuestions])

  //   Update available credits
  useEffect(() => {
    const totalCost = questions.reduce((cost, question) => cost + Math.pow(question.vote, 2), 0)

    setAvailableCredits(credits - totalCost)
  }, [questions, credits])

  return { canVote, vote, questions, availableCredits }
}

export default Conjoint
