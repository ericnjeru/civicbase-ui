import tw from 'twin.macro'
// import FeedbackTable from '../FeedbackTable'
import NoResult from '../NoResult'
import ResultTable from './ResultTable'
// import { AnswerResponse as Answer, Conjoint } from '../../../../types/answer'
import { useAnalytics } from 'contexts/analytics'

const ConjointAnalytics = () => {
  const { survey, hasAnswer } = useAnalytics()

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
      {/* {answers.length > 0 && <ResultTable answers={answers as Answer<Conjoint>[]} survey={survey} />}
      {answers.length === 0 && <NoResult title="Result" description={description} />}
      {survey.setup.feedback?.active && <FeedbackTable answers={answers as Answer<Conjoint>[]} />} */}
    </div>
  )
}

export default ConjointAnalytics
