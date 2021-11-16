import { Meta } from '@storybook/react'
import Vote from './Vote'

export default {
  title: 'Components/Vote',
  component: Vote,
} as Meta

export const Basic = () => <Vote voteUpLabel="Agree" voteDownLabel="Disagree" />
