import tw from 'twin.macro'
import AnswerTable from './AnswerTable'
import ResultTable from './ResultTable'
import { QuadraticAnswer } from '../../../../types/answer'
import { SurveyDashboard } from '../../../../types/survey'

const Quadratic = ({ survey, answers }: { survey: SurveyDashboard; answers: QuadraticAnswer[] }) => {
  return (
    <div css={tw`space-y-24 mt-24`}>
      <ResultTable survey={survey} answers={answers} />
      <AnswerTable survey={survey} answers={answers} />
    </div>
  )
}

export default Quadratic
