import { CreateRequest } from '../../types/survey'
import { Methods, Survey } from '../../../types/survey'
import { Answer } from '../../../types/answer'
import { db } from '../config/firebase'
import { Response, Request } from 'express'
import { incrementAccess } from '../utils/survey'

enum MethodIds {
  Quadratic = 'QV',
  Linear = 'L',
  Conjoint = 'C',
}

// TODO: move to utils survey
// Add default Ids to questions
const setQuestions = (survey: Survey & { setup: { method: Methods } }) => {
  return survey.questions.map((question, index: number) => ({
    ...question,
    id: `${MethodIds[survey.setup.method]}${index + 1}`,
  }))
}

// TODO: move to utils survey
const setAnalytics = () => ({
  current: {
    respondents: 0,
    access: 0,
  },
  previous: {
    respondents: 0,
    access: 0,
  },
  history: {
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

export const updateSurvey = (req: CreateRequest, res: Response) => {
  const { surveyId } = req.params
  const survey = {
    ...req.body,
    updatedAt: new Date().toISOString(),
  }

  db.collection('surveys')
    .doc(surveyId)
    .update(survey)
    .then(() => res.status(201).json(surveyId))
    .catch((error) => res.status(500).json({ ...error }))
}

export const surveys = (req: any, res: Response) => {
  const { uid } = req.user

  db.collection('surveys')
    .where('uid', '==', uid)
    .get()
    .then((data) => {
      const list: Survey[] = []

      data.forEach((doc) => {
        list.push({
          ...(doc.data() as Survey),
          id: doc.id,
        })
      })

      res.status(200).json(list)
    })
    .catch((error) => res.status(500).json(error))
}

export const publishSurvey = (req: Request, res: Response) => {
  const { surveyId } = req.params
  const survey = db.collection('surveys').doc(surveyId)

  survey
    .update({
      status: 'published',
      publishedAt: new Date().toISOString(),
    })
    .then(() => res.status(200).json({ message: 'Published' }))
    .catch((error) => res.status(500).json(error))
}

export const finishSurvey = (req: Request, res: Response) => {
  const { surveyId } = req.params
  const survey = db.collection('surveys').doc(surveyId)

  survey
    .update({
      status: 'finished',
      finishedAt: new Date().toISOString(),
    })
    .then(() => res.status(200).json({ message: 'Finished' }))
    .catch((error) => res.status(500).json(error))
}

export const cloneSurvey = (req: Request, res: Response) => {
  const { surveyId } = req.params

  db.doc(`/surveys/${surveyId}`)
    .get()
    .then((doc: any) => {
      const clonedSurvey: Survey = {
        ...doc.data(),
        setup: {
          ...doc.data().setup,
          topic: `clone - ${doc.data().setup.topic}`,
        },
        createdAt: new Date().toISOString(),
        analytics: setAnalytics(),
        status: 'pilot',
        finishedAt: null,
        publishedAt: null,
      }

      if (doc.exists && clonedSurvey) {
        return db
          .collection('surveys')
          .add(clonedSurvey)
          .then((doc) => res.status(201).json({ ...clonedSurvey, id: doc.id }))
      }

      return res.status(500).json('Can not clone survey')
    })
    .catch((error) => res.status(500).json(error))
}

export const deleteSurvey = (req: Request, res: Response) => {
  const { surveyId } = req.params

  db.doc(`/surveys/${surveyId}`)
    .delete()
    .then(() => res.status(200).json({ message: 'Deleted.' }))
    .catch((error) => res.status(500).json(error))
}

export const getSurvey = (req: Request, res: Response) => {
  const { surveyId } = req.params

  db.doc(`/surveys/${surveyId}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        res.status(200).json({ ...doc.data(), id: doc.id })
        incrementAccess(surveyId)
      } else {
        res.status(500).json({ message: 'survey does not exist' })
      }
    })
    .catch((error) => res.status(500).json(error))
}

function updateHistory(surveyId: string) {
  // TODO: sort out any
  var survey: any = db.collection('surveys').doc(surveyId)
  let p2, p1

  db.doc(`/surveys/${surveyId}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const document = doc.data()

        if (document) {
          p1 = survey.update({
            'analytics.previous.access': document.analytics.current.access,
            'analytics.previous.respondents': document.analytics.current.respondents,
          })

          if (
            document.analytics.current.access !== document.analytics.previous.access &&
            document.analytics.current.respondents !== document.analytics.previous.respondents
          ) {
            p2 = survey.update({
              'analytics.history.access': document.analytics.previous.access,
              'analytics.history.respondents': document.analytics.previous.respondents,
            })
          }
        }
      }
    })

  return Promise.all([p1, p2])
}

export const getSurveyForAnalytics = (req: Request, res: Response) => {
  const { surveyId } = req.params

  updateHistory(surveyId)
    .then(() => {
      db.doc(`/surveys/${surveyId}`)
        .get()
        .then((survey) => {
          db.collection('answers')
            .where('surveyId', '==', surveyId)
            .get()
            .then((data) => {
              const answers: Answer[] = []

              data.forEach((doc) => {
                answers.push({ ...(doc.data() as Answer), id: doc.id })
              })

              res.status(200).json({ survey: { ...survey.data(), id: survey.id }, answers })
            })
        })
        .catch((error) => res.status(500).json(error))
    })
    .catch((error) => res.status(500).json(...error))
}
