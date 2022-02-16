import tw from 'twin.macro'
import { SurveyDashboard } from '../../../../types/survey'
import FeedbackTable from '../FeedbackTable'
import ResultTable from './ResultTable'
import { AnswerResponse as Answer, Likert } from '../../../../types/answer'

const LikertAnalytics = ({ survey, answers }: { survey: SurveyDashboard; answers: Answer<Likert>[] }) => {
  return (
    <div css={tw`space-y-24 mt-24`}>
      <ResultTable answers={answers} survey={survey} />
      {survey.setup.feedback?.active && <FeedbackTable answers={answers} />}
    </div>
  )
}

export default LikertAnalytics
