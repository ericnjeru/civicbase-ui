import { ComponentMeta, ComponentStory } from '@storybook/react'
import tw from 'twin.macro'
import Tooltip from './Tooltip'

export default {
  title: 'Elements/Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>

const Template: ComponentStory<typeof Tooltip> = (args) => {
  return (
    <Tooltip {...args}>
      <button
        css={tw`m-2 bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150`}
        type="button"
      >
        Hover on me
      </button>
    </Tooltip>
  )
}

export const Basic = Template.bind({})

Basic.args = {
  label: 'This is an example',
  variant: 'dark',
}
