import { Meta } from '@storybook/react'

import Subtitle from './Subtitle'
import Title from './Title'
import Typography from './Typography'
import Caption from './Caption'
import Headline from './Headline'
import Hint from './Hint'
import tw from 'twin.macro'

export default {
  title: 'Elements/Typography',
  component: Typography,
} as Meta

export const Basic = () => (
  <div css={tw`grid grid-cols-6 gap-4`}>
    <Typography css={tw`flex justify-center items-center`}>Title</Typography>

    <div css={tw`col-span-5`}>
      <Title>Vitae delectus at facilis blanditiis corrupti dolor laboriosam repellendus</Title>
    </div>

    <Typography css={tw`flex justify-center items-center`}>Subtitle</Typography>
    <div css={tw`col-span-5`}>
      <Subtitle> Vitae delectus at facilis blanditiis corrupti dolor laboriosam repellendus</Subtitle>
    </div>

    <Typography css={tw`flex justify-center items-center`}>Typography</Typography>
    <div css={tw`col-span-5`}>
      <Typography>Vitae delectus at facilis blanditiis corrupti dolor laboriosam repellendus</Typography>
    </div>

    <Typography css={tw`flex justify-center items-center`}>Caption</Typography>
    <div css={tw`col-span-5`}>
      <Caption>Vitae delectus at facilis blanditiis corrupti dolor laboriosam repellendus</Caption>
    </div>

    <Typography css={tw`flex justify-center items-center`}>Headline</Typography>
    <div css={tw`col-span-5`}>
      <Headline>Vitae delectus at facilis blanditiis corrupti dolor laboriosam repellendus</Headline>
    </div>

    <Typography css={tw`flex justify-center items-center`}>Hint</Typography>
    <div css={tw`col-span-5`}>
      <Hint>Vitae delectus at facilis blanditiis corrupti dolor laboriosam repellendus</Hint>
    </div>
  </div>
)
