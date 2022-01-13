import { convertToRaw } from 'draft-js'
import { SurveyForm } from '../../../../types/forms'

const transform = (request: SurveyForm) => {
  const welcome = request.message?.welcome
  const completion = request.message?.completion

  if (welcome && request.message?.welcome) {
    if (welcome.getCurrentContent().hasText()) {
      const content = JSON.stringify(convertToRaw(welcome.getCurrentContent()))
      request.message.welcome = content
    } else {
      delete request.message.welcome
    }
  }

  if (completion && request.message?.completion) {
    if (completion.getCurrentContent().hasText()) {
      const content = JSON.stringify(convertToRaw(completion.getCurrentContent()))
      request.message.completion = content
    } else {
      delete request.message.completion
    }
  }

  if (request.language.jargon !== 'Custom') {
    request.language.thumbsUp = request.language.jargon.split('/')[0]
    request.language.thumbsDown = request.language.jargon.split('/')[1]
  }

  return request
}

export default transform
