import Typography, { Headline, Title } from 'components/Typography'
import tw from 'twin.macro'

const HeaderSection = () => {
  return (
    <div css={tw`flex flex-col items-center justify-center`}>
      <Headline css={tw`text-brand`}>SURVEY ANALYTICS</Headline>
      <Title css={tw`text-6xl`}>Survey A</Title>
      <div css={tw`text-center max-w-2xl`}>
        <Typography css={tw`text-gray-500 inline-block`}>This survey is setup with</Typography>{' '}
        <Typography css={tw`text-brand2 inline-block`}>Qualtrics</Typography>{' '}
        <Typography css={tw`text-gray-500 inline-block`}>as preferred function. Each respondent will have</Typography>{' '}
        <Typography css={tw`text-brand2 inline-block`}>100 Credits,</Typography>{' '}
        <Typography css={tw`text-gray-500 inline-block`}>the language designated is</Typography>{' '}
        <Typography css={tw`text-brand2 inline-block`}>Agree/Disagree.</Typography>
      </div>
    </div>
  )
}

export default HeaderSection
