import { convertToRaw } from 'draft-js'
import { SurveyForm } from '../../../../types/forms'
import { SurveyRequest } from '../../../../types/survey-request'

const transform = (request: SurveyForm): SurveyRequest => {
  const welcome = request.message?.welcome
  const completion = request.message?.completion
  const { questions } = request

  const transformedRequest: SurveyRequest = {
    setup: request.setup,
    qualtrics: request.qualtrics,
    language: request.language,
    features: request.features,
    id: request.id,
  }

  if (welcome && request.message?.welcome) {
    if (welcome.getCurrentContent().hasText()) {
      const content = JSON.stringify(convertToRaw(welcome.getCurrentContent()))
      transformedRequest.message = {
        ...transformedRequest.message,
        welcome: content,
      }
    }
  }

  if (completion && request.message?.completion) {
    if (completion.getCurrentContent().hasText()) {
      const content = JSON.stringify(convertToRaw(completion.getCurrentContent()))
      transformedRequest.message = {
        ...transformedRequest.message,
        completion: content,
      }
    }
  }

  if (questions) {
    transformedRequest.questions = questions.map((question) => {
      const statement = JSON.stringify(convertToRaw(question.statement.getCurrentContent()))

      return {
        ...question,
        statement,
      }
    })
  }

  if (request.conjoint) {
    transformedRequest.conjoint = request.conjoint
  }

  if (transformedRequest.language.jargon !== 'Custom') {
    transformedRequest.language.thumbsUp = transformedRequest.language.jargon.split('/')[0]
    transformedRequest.language.thumbsDown = transformedRequest.language.jargon.split('/')[1]
  }

  return transformedRequest
}

export default transform
