import tw from 'twin.macro'
import ResultTable from './ResultTable'
import NoResult from '../NoResult'
// import FeedbackTable from '../FeedbackTable'
import { useAnalytics } from 'contexts/analytics'

const QuadraticAnalytics = () => {
  const { hasAnswer, survey } = useAnalytics()

  if (!hasAnswer || !survey) {
    return null
  }

  const description =
    survey.status === 'finished'
      ? `This survey was finished and didn't capture any answer`
      : 'This Survey has no answer yet'

  return (
    <div css={tw`space-y-24 mt-24`}>
      {hasAnswer() ? <ResultTable /> : <NoResult title="Result" description={description} />}
      {/* {survey.setup.feedback?.active && <FeedbackTable answers={answers} />} */}
    </div>
  )
}

export default QuadraticAnalytics
