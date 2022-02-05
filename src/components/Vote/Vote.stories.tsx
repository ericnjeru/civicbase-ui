import { Meta } from '@storybook/react'
import Vote from './Vote'

export default {
  title: 'Components/Vote',
  component: Vote,
} as Meta

export const Basic = () => (
  <Vote
    thumbsUp="Agree"
    thumbsDown="Disagree"
    handleVote={() => {}}
    vote={0}
    total={100}
    creditSpent={0}
    canVoteUp={true}
    canVoteDown={true}
    token="Credits"
  />
)
