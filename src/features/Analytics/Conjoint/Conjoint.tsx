import { useAnalytics } from 'contexts/analytics'
import tw from 'twin.macro'
import { toCamelCase } from 'utilities/util'

import FeedbackTable from '../FeedbackTable'
import NoResult from '../NoResult'
import ResultTable from './ResultTable'

const ConjointAnalytics = () => {
  const { survey, hasAnswer, mode } = useAnalytics()

  if (!hasAnswer || !survey) {
    return null
  }

  const description =
    survey.status === 'finished'
      ? `This survey was finished and didn't capture any answer`
      : `This Survey has no answers on ${toCamelCase(mode)} mode`

  return (
    <div css={tw`space-y-24 mt-24`}>
      {hasAnswer() ? <ResultTable /> : <NoResult title="Result" description={description} />}
      <FeedbackTable />
    </div>
  )
}

export default ConjointAnalytics
