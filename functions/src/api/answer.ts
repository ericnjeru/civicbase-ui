import { CreateAnswerRequest } from '../../types/survey'
import { db } from '../config/firebase'
import { Response } from 'express'
import { incrementRespondent } from '../utils/survey'

export const createAnswer = (req: CreateAnswerRequest, res: Response) => {
  const answer = {
    ...req.body,
    createdAt: new Date().toISOString(),
  }

  db.collection('answers')
    .add(answer)
    .then((doc) => {
      incrementRespondent(req.body.surveyId)
      res.status(201).json(doc.id)
    })
    .catch((error) => res.status(500).json(error))
}
