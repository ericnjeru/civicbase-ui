import { db, admin } from '../config/firebase'

export function incrementAccess(surveyId: string) {
  var survey = db.collection('surveys').doc(surveyId)

  survey.update({
    'analytics.current.access': admin.firestore.FieldValue.increment(1),
  })
}

export function incrementRespondent(surveyId: string) {
  var survey = db.collection('surveys').doc(surveyId)

  survey.update({
    'analytics.current.respondents': admin.firestore.FieldValue.increment(1),
  })
}
