import { CreateRequest } from '../../types/survey'
import { db } from '../config/firebase'
import { Response, Request } from 'express'
import { incrementAccess, setQuestionsId } from '../utils/survey'
import { SurveyDashboard } from '../../../types/survey'
import { getResults } from '../utils/results'
import { getCSV } from '../utils/csv'
import getFeedback from '../utils/feedback'

export enum MethodIds {
  Quadratic = 'Q',
  Likert = 'L',
  Conjoint = 'C',
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
  // TODO: create this type
  const survey: any = {
    ...req.body,
    createdAt: new Date().toISOString(),
    uid: req.user.uid,
    status: 'pilot',
    analytics: setAnalytics(),
  }
  // TODO: this logig is being repeated
  if (req.body.setup.method === 'Quadratic') {
    survey.quadratic = setQuestionsId(survey)
  }

  if (req.body.setup.method === 'Conjoint') {
    survey.conjoint = setQuestionsId(survey)
  }

  if (req.body.setup.method === 'Likert') {
    survey.likert = setQuestionsId(survey)
  }

  db.collection('surveys')
    .add(survey)
    .then((doc) => res.status(201).json(doc.id))
    .catch((error) => res.status(500).json({ ...error }))
}

export const updateSurvey = (req: CreateRequest, res: Response) => {
  const { surveyId } = req.params
  const survey: any = {
    ...req.body,
    updatedAt: new Date().toISOString(),
  }

  if (req.body.setup.method === 'Quadratic') {
    survey.quadratic = setQuestionsId(survey)
  }

  if (req.body.setup.method === 'Conjoint') {
    survey.conjoint = setQuestionsId(survey)
  }

  if (req.body.setup.method === 'Likert') {
    survey.likert = setQuestionsId(survey)
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
      const list: SurveyDashboard[] = []

      data.forEach((doc) => {
        list.push({
          ...(doc.data() as SurveyDashboard),
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
      const clonedSurvey = {
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
    .then(() => db.doc(`/answers/${surveyId}`).delete())
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

// TODO: move to utils
// function updateHistory(surveyId: string) {
//   // TODO: sort out any
//   var survey: any = db.collection('surveys').doc(surveyId)
//   let p2, p1

//   db.doc(`/surveys/${surveyId}`)
//     .get()
//     .then((doc) => {
//       if (doc.exists) {
//         const document = doc.data()

//         if (document) {
//           p1 = survey.update({
//             'analytics.previous.access': document.analytics.current.access,
//             'analytics.previous.respondents': document.analytics.current.respondents,
//           })

//           if (
//             document.analytics.current.access !== document.analytics.previous.access &&
//             document.analytics.current.respondents !== document.analytics.previous.respondents
//           ) {
//             p2 = survey.update({
//               'analytics.history.access': document.analytics.previous.access,
//               'analytics.history.respondents': document.analytics.previous.respondents,
//             })
//           }
//         }
//       }
//     })

//   return Promise.all([p1, p2])
// }
// TODO: solve this type
export const getSurveyForAnalytics = (req: any, res: Response) => {
  const { surveyId } = req.params

  db.doc(`/surveys/${surveyId}`)
    .get()
    .then((survey) => {
      if (survey.exists) {
        const surveyData = survey.data() as SurveyDashboard

        if (surveyData?.uid !== req.user.uid) {
          res.status(403).json({ message: 'You have no permission to see this data' })
        } else {
          db.doc(`/answers/${surveyId}`)
            .get()
            .then((answers) => {
              const asnwersData = answers.data()?.answers
              let response: any = { survey: { ...surveyData, id: survey.id } }

              if (answers.exists) {
                response.results = getResults(surveyData, asnwersData)
                response.csv = {
                  pilot: getCSV(
                    surveyData,
                    asnwersData?.filter(({ status }: { status: string }) => status === 'pilot'),
                  ),
                  published: getCSV(
                    surveyData,
                    asnwersData?.filter(({ status }: { status: string }) => status === 'published'),
                  ),
                }

                getCSV(surveyData, asnwersData)

                if (surveyData?.setup.feedback?.active) {
                  response.feedback = getFeedback(asnwersData)
                }
              }

              res.status(200).json(response)
            })
        }
      }
    })
    .catch((error) => res.status(500).json(error))
}
