import tw, { theme } from 'twin.macro'
import { BsDownload } from 'react-icons/bs'
import { format } from 'date-fns'
import { CSVLink } from 'react-csv'
import { PrimaryButton } from 'components/Button'
import { SurveyDashboard } from '../../../../../types/survey'
import { AnswerResponse as Answer, Quadratic } from '../../../../../types/answer'
import Tooltip from 'components/Tooltip'

const DownloadAnswers = ({
  answers,
  hasUserId,
  survey,
}: {
  answers: Answer<Quadratic>[]
  hasUserId: boolean
  survey: SurveyDashboard
}) => {
  if (!answers || answers.length === 0) {
    return null
  }

  const csvData = []

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

  return (
    <CSVLink data={csvData} filename={`${survey.setup.topic}.csv`} style={{ outline: 'none', textDecoration: 'none' }}>
      <Tooltip label="Download CSV" popperProps={{ delayShow: 1000, placement: 'top' }}>
        <PrimaryButton css={tw`flex items-center`}>
          <BsDownload size={24} color={theme`colors.white`} css={tw`mr-2`} />
          Download
        </PrimaryButton>
      </Tooltip>
    </CSVLink>
  )
}

export default DownloadAnswers
