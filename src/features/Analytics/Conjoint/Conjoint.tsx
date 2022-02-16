import tw from 'twin.macro'
import { ConjointAnswer } from '../../../../types/answer'
import { SurveyDashboard } from '../../../../types/survey'
import FeedbackTable, { FeedbackAnswer } from '../FeedbackTable'
import NoResult from '../NoResult'
import AnswerTable from './AnswerTable'
import ResultTable from './ResultTable'

const Conjoint = ({ survey, answers }: { survey: SurveyDashboard; answers: ConjointAnswer[] }) => {
  const description =
    survey.status === 'finished'
      ? `This survey was finished and didn't capture any answer`
      : 'This Survey has no answer yet'

  return (
    <div css={tw`space-y-24 mt-24`}>
      {answers.length > 0 && <ResultTable answers={answers} survey={survey} />}
      {answers.length > 0 && <AnswerTable answers={answers} survey={survey} />}
      {answers.length === 0 && <NoResult title="Result" description={description} />}
      {survey.setup.feedback?.active && <FeedbackTable answers={answers as FeedbackAnswer[]} />}
    </div>
  )
}

export default Conjoint
