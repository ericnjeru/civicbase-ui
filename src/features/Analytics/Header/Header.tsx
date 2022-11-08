import Typography, { Headline, Title } from 'components/Typography'
import { useAnalytics } from 'contexts/analytics'
import tw from 'twin.macro'
import { surveyMethods } from 'utilities/constants'

import Mode from './Mode'
import Skeleton from './Skeleton'

const Header = () => {
  const { isLoading, survey } = useAnalytics()

  if (!survey || isLoading) {
    return <Skeleton />
  }

  const {
    setup: { method, topic, credits },
    language,
  } = survey

  return (
    <div css={tw`flex flex-col items-center justify-center`}>
      {survey?.status === 'published' && (
        <div css={tw`flex justify-end w-full`}>
          <Mode />
        </div>
      )}
      <Headline css={tw`text-blue-500 mb-8`}>SURVEY ANALYTICS</Headline>
      <Title css={tw`text-6xl`}>{topic}</Title>
      <div css={tw`text-center max-w-2xl`}>
        <Typography css={tw`text-gray-500 inline-block`}>This survey is setup with</Typography>{' '}
        <Typography css={tw`text-brand2 inline-block`}>{method}</Typography>{' '}
        <Typography css={tw`text-gray-500 inline-block`}>as it&apos;s methodology.</Typography>{' '}
        {method === surveyMethods.Quadratic && (
          <>
            <Typography css={tw`text-gray-500 inline-block`}>Each respondent will have</Typography>{' '}
            <Typography css={tw`text-brand2 inline-block`}>
              {credits} {language?.token === 'Custom' ? language?.customToken : language?.token},
            </Typography>
          </>
        )}{' '}
        {method === surveyMethods.Quadratic && (
          <>
            <Typography css={tw`text-gray-500 inline-block`}>the language designated is</Typography>{' '}
            <Typography css={tw`text-brand2 inline-block`}>
              {language?.thumbsUp}/{language?.thumbsDown}
            </Typography>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
