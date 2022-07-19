import { AnswerResponse as Answer, Quadratic } from '../../../types/answer'
import { SurveyDashboard } from '../../../types/survey'
const userId = ['userid', 'userId', 'userID']

export function getCSV(survey: SurveyDashboard, answers: Answer<unknown>[]) {
  switch (survey.setup.method) {
    case 'Quadratic':
      const sortedAnswers: any = answers.sort((a, b) => {
        return a.createdAt < b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0
      })

      return csvQuadratic(sortedAnswers, survey)

    case 'Conjoint':
      return csvConjoint()

    case 'Likert':
      return csvLikert()

    default:
      return []
  }
}

const userHasId = (answers: Answer<unknown>[]) => {
  let flag = false
  answers.forEach((answer) => {
    userId.forEach((id) => {
      if (answer[id]) {
        flag = true
      }
    })
  })

  return flag
}

const userHasSuburb = (answers: Answer<unknown>[]) => {
  let flag = false
  answers.forEach((answer) => {
    if (answer.suburb) {
      flag = true
    }
  })

  return flag
}

const csvQuadratic = (answers: Answer<Quadratic>[], survey: SurveyDashboard) => {
  const csvData: any[] = []
  const hasUserId = userHasId(answers)
  const hasSuburb = userHasSuburb(answers)

  if (!answers || answers.length === 0) {
    return []
  }

  const header = ['#']
  if (hasUserId) {
    header.push('user id')
  }

  if (hasSuburb) {
    header.push('suburb')
  }

  //   Questions IDs
  answers[0].questions
    .sort((a, b) => a.id.localeCompare(b.id))
    .forEach((question) => {
      header.push(question.id)
    })

  // Questions order
  answers[0].questions.forEach((a, index) => {
    header.push(`S${index + 1}`)
  })

  header.push('create at')
  header.push('survey load at')
  header.push('start at')
  header.push('questions stated at')
  header.push('submited at')
  header.push('credit left')

  if (survey.setup.feedback?.active) {
    for (let index = 0; index < survey.setup.feedback.questions.length; index++) {
      header.push(`Feedback ${index + 1}`)
    }
  }

  csvData.push(header)

  answers.forEach((answer, index) => {
    const row: string[] = [`${index + 1}`]

    if (hasUserId) {
      row.push(answer.userId)
    }

    if (hasSuburb) {
      row.push(answer.suburb)
    }

    // Questions Vote
    answer.questions
      .sort((a, b) => a.id.localeCompare(b.id))
      .forEach((question) => {
        row.push(`${question.vote}`)
      })

    // Questios order
    answer.questions
      .sort((a, b) => a.order - b.order)
      .forEach((question) => {
        row.push(question.id)
      })

    row.push(new Date(answer.createdAt).toLocaleString('en-AU', { timeZone: 'Australia/Brisbane' }))
    row.push(new Date(answer.time.surveyLoadAt).toLocaleString('en-AU', { timeZone: 'Australia/Brisbane' }))
    row.push(new Date(answer.time.startAt).toLocaleString('en-AU', { timeZone: 'Australia/Brisbane' }))
    row.push(new Date(answer.time.questionPageLoadAt).toLocaleString('en-AU', { timeZone: 'Australia/Brisbane' }))
    row.push(new Date(answer.time.submitedAt).toLocaleString('en-AU', { timeZone: 'Australia/Brisbane' }))

    row.push(`${answer.leftCredits}`)

    // Feedback
    if (survey.setup.feedback?.active && answer.feedback) {
      const feedbacks = survey.setup.feedback.questions.map((f) => {
        let flag = { answer: '' }

        answer.feedback?.forEach((fe) => {
          if (fe.id === f.id) {
            flag = fe
          }
        })

        return flag
      })

      feedbacks.forEach((feedback) => row.push(feedback.answer))
    }

    csvData.push(row)
  })
  return csvData
}

const csvConjoint = () => {
  return []
}
const csvLikert = () => {
  return []
}
