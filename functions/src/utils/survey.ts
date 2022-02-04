import { SurveyRespondent } from '../../../types/survey'
import { db, admin } from '../config/firebase'

export enum MethodIds {
  Quadratic = 'Q',
  Likert = 'L',
  Conjoint = 'C',
}

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

export function setQuestionsId(survey: SurveyRespondent) {
  switch (survey.setup.method) {
    case 'Quadratic':
      return survey.quadratic?.map((question, index) => ({
        ...question,
        id: `${MethodIds.Quadratic}${index + 1}`,
      }))
    case 'Conjoint':
      return survey.conjoint?.map((question, index) => ({
        ...question,
        items: question.items.map((item, itemIndex) => ({
          ...item,
          id: `${MethodIds.Conjoint}${index + 1}-item${itemIndex + 1}`,
        })),
        id: `${MethodIds.Conjoint}${index + 1}`,
      }))
    case 'Likert':
      return []
  }
}
