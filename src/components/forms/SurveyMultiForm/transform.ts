import { convertToRaw } from 'draft-js'
import { surveyMethods } from 'utilities/constants'

import { SurveyForm } from '../../../../types/forms'
import { Setup } from '../../../../types/survey-base'
import { SurveyRequest } from '../../../../types/survey-request'

const transform = (request: SurveyForm): SurveyRequest => {
  const welcome = request.message?.welcome
  const completion = request.message?.completion
  const { quadratic, likert, conjoint, setup, language, features, priced } = request

  const transformedRequest: SurveyRequest = {
    setup: setup as Setup,
  }

  if (!transformedRequest.setup.feedback?.active) {
    delete transformedRequest.setup.feedback
  } else {
    transformedRequest.setup.feedback.questions = transformedRequest.setup.feedback.questions.map((q, index) => ({
      ...q,
      id: `F${index}`,
    }))
  }

  if (request.id) {
    transformedRequest.id = request.id
  }

  if (request.qualtrics) {
    transformedRequest.qualtrics = request.qualtrics
  }

  if (features && Object.keys(features).length > 0) {
    const slicedPrices: [number[]] = features?.priced?.slice(0, features?.totalObservations) as [number[]]
    transformedRequest.features = {
      ...features,
      priced: JSON.stringify(slicedPrices),
    }
  }

  if ((likert && likert.length > 0) || (conjoint && conjoint.length > 0)) {
    delete transformedRequest.setup.credits
    delete transformedRequest.language
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

  if (quadratic && quadratic.length > 0 && setup.method === surveyMethods.Quadratic) {
    if (!setup.methodPreference) {
      transformedRequest.setup.methodPreference = 'radius'
    }

    if (language) {
      transformedRequest.language = language
    }

    transformedRequest.quadratic = quadratic.map((question) => {
      const statement = JSON.stringify(convertToRaw(question.statement.getCurrentContent()))

      return {
        ...question,
        statement,
      }
    })
  }

  if (priced && priced.length > 0 && setup.method === surveyMethods.Priced) {
    if (!setup.methodPreference) {
      transformedRequest.setup.methodPreference = 'radius'
    }

    if (language) {
      transformedRequest.language = language
    }

    transformedRequest.priced = priced.map((question) => {
      const statement = JSON.stringify(convertToRaw(question.statement.getCurrentContent()))

      return {
        ...question,
        statement,
      }
    })
  }

  if (likert && likert.length > 0 && setup.method === surveyMethods.Likert) {
    transformedRequest.likert = likert.map((question) => {
      const statement = JSON.stringify(convertToRaw(question.statement.getCurrentContent()))

      return {
        ...question,
        statement,
      }
    })
  }

  if (conjoint && conjoint.length > 0 && setup.method === surveyMethods.Conjoint) {
    transformedRequest.conjoint = conjoint.map((question) => {
      const statement = JSON.stringify(convertToRaw(question.statement.getCurrentContent()))

      return {
        ...question,
        statement,
      }
    })
  }

  if (transformedRequest.language && transformedRequest.language?.jargon !== 'Custom') {
    transformedRequest.language.thumbsUp = transformedRequest.language?.jargon.split('/')[0]
    transformedRequest.language.thumbsDown = transformedRequest.language?.jargon.split('/')[1]
  }

  if (!transformedRequest.message) {
    transformedRequest.message = {}
  }

  return transformedRequest
}

export default transform
