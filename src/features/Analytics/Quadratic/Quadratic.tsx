import tw from 'twin.macro'
// import AnswerTable from './AnswerTable'
import ResultTable from './ResultTable'
import NoResult from '../NoResult'
import FeedbackTable from '../FeedbackTable'
import { AnswerResponse as Answer, Quadratic } from '../../../../types/answer'
import { useAnalytics } from 'contexts/analytics'

const QuadraticAnalytics = () => {
  const { survey, answers } = useAnalytics()

  if (!survey || !answers) {
    return null
  }

  const description =
    survey.status === 'finished'
      ? `This survey was finished and didn't capture any answer`
      : 'This Survey has no answer yet'

  return (
    <div css={tw`space-y-24 mt-24`}>
      {answers.length > 0 && <ResultTable answers={answers as Answer<Quadratic>[]} survey={survey} />}
      {/* {answers.length > 0 && <AnswerTable survey={survey} answers={answers as Answer<Quadratic>[]} />} */}
      {answers.length === 0 && <NoResult title="Result" description={description} />}
      {survey.setup.feedback?.active && <FeedbackTable answers={answers} />}
    </div>
  )
}

export default QuadraticAnalytics
