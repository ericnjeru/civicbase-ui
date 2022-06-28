import { CreateAnswerRequest } from '../../types/survey'
import { db, admin } from '../config/firebase'
import { Response } from 'express'
import { incrementRespondent } from '../utils/survey'
import { v4 as uuidv4 } from 'uuid'

export const createAnswer = (req: CreateAnswerRequest, res: Response) => {
  const answer = {
    ...req.body,
    createdAt: new Date().toISOString(),
    id: uuidv4(),
  }

  db.doc(`/answers/${answer.surveyId}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const document = db.collection('answers').doc(answer.surveyId)

        document.update({ answers: admin.firestore.FieldValue.arrayUnion(answer) }).then(() => {
          incrementRespondent(answer.surveyId, answer.status)
        })
      } else {
        db.collection('answers')
          .doc(answer.surveyId)
          .set({})
          .then(() => {
            const document = db.collection('answers').doc(answer.surveyId)

            document.update({ answers: admin.firestore.FieldValue.arrayUnion(answer) }).then(() => {
              incrementRespondent(answer.surveyId, answer.status)
            })
          })
      }

      res.status(201).json(doc.id)
    })
    .catch((error) => res.status(500).json(error))
}
