import { AnswerResponse as Answer } from '../../../types/answer'

const getFeedback = (answers: Answer<unknown>[]) => {
  const feeback: any = {
    pilot: [],
    published: [],
  }

  answers.forEach((answer) => {
    if (answer.feedback) {
      answer.feedback.forEach((feedback) => {
        if (answer.status === 'pilot') {
          feeback.pilot.push(feedback)
        }

        if (answer.status === 'published') {
          feeback.published.push(feedback)
        }
      })
    }
  })

  return feeback
}

export default getFeedback
