import { ComponentMeta, ComponentStory } from '@storybook/react'
import tw from 'twin.macro'
import DynamicBar from './DynamicBar'

export default {
  title: 'Components/DynamicBar',
  component: DynamicBar,
} as ComponentMeta<typeof DynamicBar>

const Template: ComponentStory<typeof DynamicBar> = (args) => {
  return (
    <div css={tw`w-screen flex justify-center h-80`}>
      <div css={tw`w-5/6`}>
        <DynamicBar {...args} />
      </div>
    </div>
  )
}

export const Basic = Template.bind({})

Basic.args = {
  total: 30,
  availableCredits: 10,
  language: 'Credits',
}
