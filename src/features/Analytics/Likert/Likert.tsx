import tw from 'twin.macro'
import { LikertAnswer } from '../../../../types/answer'
import { SurveyDashboard } from '../../../../types/survey'
import ResultTable from './ResultTable'

const Likert = ({ survey, answers }: { survey: SurveyDashboard; answers: LikertAnswer[] }) => {
  return (
    <div css={tw`space-y-24 mt-24`}>
      <ResultTable answers={answers} survey={survey} />
    </div>
  )
}

export default Likert
