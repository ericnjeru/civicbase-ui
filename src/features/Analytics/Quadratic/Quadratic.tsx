import tw from 'twin.macro'
import AnswerTable from './AnswerTable'
import ResultTable from './ResultTable'
import { QuadraticAnswer } from '../../../../types/answer'
import { SurveyDashboard } from '../../../../types/survey'
import NoResult from '../NoResult'
import FeedbackTable from '../FeedbackTable'

const Quadratic = ({ survey, answers }: { survey: SurveyDashboard; answers: QuadraticAnswer[] }) => {
  const description =
    survey.status === 'finished'
      ? `This survey was finished and didn't capture any answer`
      : 'This Survey has no answer yet'

  return (
    <div css={tw`space-y-24 mt-24`}>
      {answers.length > 0 && <ResultTable answers={answers} />}
      {answers.length > 0 && <AnswerTable survey={survey} answers={answers} />}
      {answers.length === 0 && <NoResult title="Result" description={description} />}
      {survey.setup.feedback?.active && <FeedbackTable answers={answers} />}
    </div>
  )
}

export default Quadratic
