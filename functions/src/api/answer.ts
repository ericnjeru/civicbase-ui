import { Response } from 'express'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { CreateAnswerRequest } from '../../types/survey'
import { db } from '../config/firebase'
import { incrementRespondent } from '../utils/survey'
import ShortUniqueId from 'short-unique-id'

const uid = new ShortUniqueId({ length: 16 })

type UploadRecorderRequest = {
  body: File | Blob
}

export const uploadRecord = (req: UploadRecorderRequest, res: Response) => {
  const file: any = req.body
  const fileId = uid()
  const metadata = {
    contentType: 'audio/ogg; codecs=opus',
  }
  const storage = getStorage()
  const storageRef = ref(storage, `records/${fileId}.ogg`)

  return uploadBytes(storageRef, file, metadata).then(() => {
    return getDownloadURL(storageRef).then((downloadUrl) => res.status(201).json({ fileId, downloadUrl }))
  })
}

export const createIndiaAnswer = (req: any, res: Response) => {
  const answer = {
    ...req.body,
    createdAt: new Date().toISOString(),
  }

  db.collection('india')
    .add(answer)
    .then((doc) => res.status(201).json(doc.id))
    .catch((error) => res.status(500).json(error))
}

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
