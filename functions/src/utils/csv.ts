import { AnswerResponse as Answer, Quadratic } from '../../../types/answer'
import { SurveyDashboard } from '../../../types/survey'
import { format } from 'date-fns'
const userId = ['userid', 'userId', 'userID']

export function getCSV(survey: SurveyDashboard, answers: Answer<unknown>) {
  switch (survey.setup.method) {
    case 'Quadratic':
      return csvQuadratic(answers as any)

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

const csvQuadratic = (answers: Answer<Quadratic>[]) => {
  const csvData: any[] = []
  const hasUserId = userHasId(answers)

  const header = ['#']
  if (hasUserId) {
    header.push('user id')
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
  header.push('status')

  csvData.push(header)

  answers.forEach((answer, index) => {
    const row: string[] = [`${index + 1}`]

    if (hasUserId) {
      row.push(answer.userId)
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

    // TODO: format date
    row.push(format(new Date(answer.createdAt), 'dd/MM/yy hh:mm'))
    row.push(format(new Date(answer.time.surveyLoadAt), 'dd/MM/yy hh:mm'))
    row.push(format(new Date(answer.time.startAt), 'dd/MM/yy hh:mm'))
    row.push(format(new Date(answer.time.questionPageLoadAt), 'dd/MM/yy hh:mm'))
    row.push(format(new Date(answer.time.submitedAt), 'dd/MM/yy hh:mm'))

    row.push(`${answer.leftCredits}`)
    row.push(answer.status)

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
