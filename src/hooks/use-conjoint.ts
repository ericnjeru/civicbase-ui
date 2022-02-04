import { useEffect, useState } from 'react'
import { SurveyRespondent } from '../../types/survey'
import { ConjointQuestions } from '../../types/survey-base'

const useConjoint = (survey: SurveyRespondent) => {
  const [questions, setQuestions] = useState<ConjointQuestions[]>([])

  useEffect(() => {
    if (survey && survey.conjoint) {
      setQuestions([...survey.conjoint] as ConjointQuestions[])
    }
  }, [survey])

  const vote = (questionIndex: number, id: string) => {
    if (questions) {
      setQuestions((q) => {
        return q.map((question, index) => {
          if (index === questionIndex) {
            question.selected = id
          }
          return question
        })
      })
    }
  }

  return {
    questions,
    vote,
  }
}

export default useConjoint
