import { Meta } from '@storybook/react'

import Subtitle from './Subtitle'
import Title from './Title'
import Typography from './Typography'
import Caption from './Caption'
import Headline from './Headline'
import Hint from './Hint'

export default {
  title: 'Elements/Typography',
  component: Typography,
} as Meta

export const Basic = () => (
  <>
    <div>
      <Title>Title: Vitae delectus at facilis blanditiis corrupti dolor laboriosam repellendus</Title>
    </div>
    <div>
      <Subtitle>Subtitle: Vitae delectus at facilis blanditiis corrupti dolor laboriosam repellendus</Subtitle>
    </div>
    <div>
      <Typography>Typography: Vitae delectus at facilis blanditiis corrupti dolor laboriosam repellendus</Typography>
    </div>
    <div>
      <Caption>Caption: Vitae delectus at facilis blanditiis corrupti dolor laboriosam repellendus</Caption>
    </div>
    <div>
      <Headline>Headline: Vitae delectus at facilis blanditiis corrupti dolor laboriosam repellendus</Headline>
    </div>
    <div>
      <Hint>Hint: Vitae delectus at facilis blanditiis corrupti dolor laboriosam repellendus</Hint>
    </div>
  </>
)
