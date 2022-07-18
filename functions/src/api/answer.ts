import { Response } from 'express'
import { CreateAnswerRequest } from '../../types/survey'
import { db } from '../config/firebase'
import { incrementRespondent } from '../utils/survey'

export const createAnswer = (req: CreateAnswerRequest, res: Response) => {
  const answer = {
    ...req.body,
    createdAt: new Date().toISOString(),
  }

  db.collection('surveys')
    .doc(answer.surveyId)
    .collection('answers')
    .add(answer)
    .then((doc) => incrementRespondent(answer.surveyId, answer.status).then(() => res.status(201).json(doc.id)))
    .catch((error) => res.status(500).json(error))
}
