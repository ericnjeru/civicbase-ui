import tw from 'twin.macro'
import { LikertAnswer } from '../../../../types/answer'
import { SurveyDashboard } from '../../../../types/survey'
import FeedbackTable, { FeedbackAnswer } from '../FeedbackTable'
import ResultTable from './ResultTable'

const Likert = ({ survey, answers }: { survey: SurveyDashboard; answers: LikertAnswer[] }) => {
  return (
    <div css={tw`space-y-24 mt-24`}>
      <ResultTable answers={answers} survey={survey} />
      {survey.setup.feedback?.active && <FeedbackTable answers={answers as FeedbackAnswer[]} />}
    </div>
  )
}

export default Likert
