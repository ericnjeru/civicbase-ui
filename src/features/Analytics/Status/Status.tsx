import * as Stats from 'components/Stats'
import { useAnalytics } from 'contexts/analytics'
import tw from 'twin.macro'
import { toCamelCase } from 'utilities/util'

import Skeleton from './Skeleton'

const Status = () => {
  const { isLoading, survey } = useAnalytics()

  if (!survey || isLoading) {
    return <Skeleton />
  }

  return (
    <div css={tw`mt-24`}>
      <Stats.List>
        <Stats.Item title="Total Respondents" metric={0}>
          {/* <Badge style={{ height: 'min-content' }} css={tw`bg-green-200 flex items-center text-green-900`}>
            <AiOutlineArrowUp css={tw`mr-1 text-green-600`} />
            {respondentsIncrement}%
          </Badge> */}
        </Stats.Item>
        <Stats.Item title="Total Access" metric={0}>
          {/* <Badge style={{ height: 'min-content' }} css={tw`bg-green-200 flex items-center text-green-900`}>
            <AiOutlineArrowUp css={tw`mr-1 text-green-600`} />
            {accessIncrement}%
          </Badge> */}
        </Stats.Item>
        <Stats.Item title="Convertion Rate" metric={`${0}%`}>
          {/* {convertionIncrement && convertionIncrement > 0 ? (
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
          ) : null} */}
        </Stats.Item>
        <Stats.Item title="Current Status" metric={toCamelCase(survey.status)} />
      </Stats.List>
    </div>
  )
}

export default Status
