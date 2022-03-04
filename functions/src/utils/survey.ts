import { SurveyRespondent } from '../../../types/survey'
import { db, admin } from '../config/firebase'

export enum MethodIds {
  Quadratic = 'Q',
  Likert = 'L',
  Conjoint = 'C',
}

export function incrementAccess(surveyId: string, status: 'pilot' | 'published' | 'finished') {
  var survey = db.collection('surveys').doc(surveyId)

  if (status === 'pilot') {
    survey.update({
      'analytics.pilot.current.access': admin.firestore.FieldValue.increment(1),
    })
  }

  if (status === 'published') {
    survey.update({
      'analytics.published.current.access': admin.firestore.FieldValue.increment(1),
    })
  }
}

export function incrementRespondent(surveyId: string, status: 'pilot' | 'published' | 'finished') {
  const survey = db.collection('surveys').doc(surveyId)

  if (status === 'pilot') {
    survey.update({
      'analytics.pilot.current.respondents': admin.firestore.FieldValue.increment(1),
    })
  }

  if (status === 'published') {
    survey.update({
      'analytics.published.current.respondents': admin.firestore.FieldValue.increment(1),
    })
  }
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
      return survey.likert?.map((question, index) => ({
        ...question,
        id: `${MethodIds.Likert}${index + 1}`,
      }))
  }
}
