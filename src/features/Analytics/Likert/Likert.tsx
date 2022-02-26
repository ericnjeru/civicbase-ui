import tw from 'twin.macro'
// import FeedbackTable from '../FeedbackTable'
import ResultTable from './ResultTable'
import { useAnalytics } from 'contexts/analytics'

const LikertAnalytics = () => {
  const { survey, answers } = useAnalytics()

  if (!survey || !answers) {
    return null
  }

  return (
    <div css={tw`space-y-24 mt-24`}>
      <ResultTable />
      {/* {survey.setup.feedback?.active && <FeedbackTable answers={answers as Answer<Likert>[]} />} */}
    </div>
  )
}

export default LikertAnalytics
