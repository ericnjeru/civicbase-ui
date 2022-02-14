import tw from 'twin.macro'
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'
import * as Stats from 'components/Stats'
import Badge from 'components/Badge'

import useSurveyAnalytics from 'hooks/use-survey-analytics'
import { SurveyDashboard } from '../../../../types/survey'
import { toCamelCase } from 'utilities/util'

const Status = ({ survey }: { survey: SurveyDashboard }) => {
  const { totalAccess, totalRespondents, accessIncrement, respondentsIncrement, convertionRate, convertionIncrement } =
    useSurveyAnalytics(survey)

  return (
    <Stats.List>
      <Stats.Item title="Total Respondents" metric={totalRespondents || 0}>
        <Badge style={{ height: 'min-content' }} css={tw`bg-green-200 flex items-center text-green-900`}>
          <AiOutlineArrowUp css={tw`mr-1 text-green-600`} />
          {respondentsIncrement}%
        </Badge>
      </Stats.Item>
      <Stats.Item title="Total Access" metric={totalAccess || 0}>
        <Badge style={{ height: 'min-content' }} css={tw`bg-green-200 flex items-center text-green-900`}>
          <AiOutlineArrowUp css={tw`mr-1 text-green-600`} />
          {accessIncrement}%
        </Badge>
      </Stats.Item>
      <Stats.Item title="Convertion Rate" metric={`${convertionRate}%`}>
        {convertionIncrement && convertionIncrement > 0 ? (
          <Badge
            style={{ height: 'min-content' }}
            css={[
              tw`flex items-center`,
              convertionIncrement && convertionIncrement > 0
                ? tw`bg-green-200 text-green-900`
                : tw`bg-red-200 text-red-900`,
            ]}
          >
            {convertionIncrement && convertionIncrement > 0 ? (
              <AiOutlineArrowUp css={tw`mr-1 text-green-600`} />
            ) : (
              <AiOutlineArrowDown css={tw`mr-1 text-red-600`} />
            )}
            {convertionIncrement}%
          </Badge>
        ) : null}
      </Stats.Item>
      <Stats.Item title="Current Status" metric={toCamelCase(survey.status)} />
    </Stats.List>
  )
}

export default Status
