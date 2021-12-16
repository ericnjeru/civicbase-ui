import { CreateRequest, UpdateRequest } from '../../types/survey'
import { Survey } from '../../../types/survey'
import { db } from '../config/firebase'
import { Response } from 'express'

enum FunctionIds {
  quadratic = 'QV',
  linear = 'L',
}

// Add Ids to questions
const setQuestions = (survey: Survey) => {
  return survey.questions.map((question, index: number) => ({
    ...question,
    id: `${FunctionIds[survey.setup.function]}${index + 1}`,
  }))
}

const setAnalytics = () => ({
  current: {
    respondents: 0,
    access: 0,
  },
  previous: {
    respondents: 0,
    access: 0,
  },
})

export const createSurvey = (req: CreateRequest, res: Response) => {
  const survey = {
    ...req.body,
    createdAt: new Date().toISOString(),
    uid: req.user.uid,
    status: 'pilot',
    questions: setQuestions(req.body),
    analytics: setAnalytics(),
  }

  db.collection('surveys')
    .add(survey)
    .then((doc) => res.status(201).json(doc.id))
    .catch((error) => res.status(500).json({ ...error }))
}

export const updateSurvey = (req: UpdateRequest, res: Response) => {
  const survey = req.body

  if (survey.id) {
    db.collection('surveys')
      .doc(survey.id)
      .update({
        ...survey,
        updatedAt: new Date().toISOString(),
      })
      .then(() => res.status(204)) // Need to check if we need to return the updated survey
      .catch((error) => res.status(500).json({ ...error }))
  } else {
    res.status(500).json({ message: 'Survey has no ID and can not be updated' })
  }
}
