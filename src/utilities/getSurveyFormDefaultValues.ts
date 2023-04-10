import { convertFromRaw, EditorState } from 'draft-js'

import { SurveyForm } from '../../types/forms'
import { EditSurvey } from '../../types/survey'

const getDefaultValues = (survey: EditSurvey): SurveyForm => {
  if (survey?.id) {
    const welcomeMessage = survey.message?.welcome && convertFromRaw(JSON.parse(survey?.message?.welcome))
    const completionMessage = survey.message?.completion && convertFromRaw(JSON.parse(survey?.message?.completion))

    return {
      ...survey,
      message: {
        welcome: welcomeMessage ? EditorState.createWithContent(welcomeMessage) : EditorState.createEmpty(),
        completion: completionMessage ? EditorState.createWithContent(completionMessage) : EditorState.createEmpty(),
      },
      quadratic: survey.quadratic?.map((question) => {
        const statement = EditorState.createWithContent(convertFromRaw(JSON.parse(question.statement)))

        return {
          ...question,
          statement,
        }
      }),
      conjoint: survey.conjoint?.map((question) => {
        const statement = EditorState.createWithContent(convertFromRaw(JSON.parse(question.statement)))

        return {
          ...question,
          statement,
        }
      }),
      likert: survey.likert?.map((question) => {
        const statement = EditorState.createWithContent(convertFromRaw(JSON.parse(question.statement)))

        return {
          ...question,
          statement,
        }
      }),
      costs: survey.costs,
    }
  } else {
    return {
      setup: {
        credits: 1,
        method: null,
        topic: '',
        feedback: {
          active: false,
          questions: [],
        },
      },
      costs: [],
      language: null,
      message: {
        welcome: EditorState.createEmpty(),
        completion: EditorState.createEmpty(),
      },
    }
  }
}

export default getDefaultValues
