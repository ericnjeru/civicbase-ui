import { ComponentMeta, ComponentStory } from '@storybook/react'
import Vote from './Vote'

export default {
  title: 'Components/Vote',
  component: Vote,
} as ComponentMeta<typeof Vote>

const Template: ComponentStory<typeof Vote> = (args) => {
  return <Vote {...args} />
}

export const Basic = Template.bind({})

Basic.args = {
  thumbsUp: 'Agree',
  thumbsDown: 'Disagree',
  vote: 0,
  total: 100,
  creditSpent: 0,
  canVoteUp: true,
  canVoteDown: true,
  token: 'Credits',
  handleVote: () => {},
}
