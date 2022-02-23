import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'
import tw from 'twin.macro'
import Dropdown from './Dropdown'

export default {
  title: 'Elements/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>

const Template: ComponentStory<typeof Dropdown> = (args) => {
  const [option, setOption] = useState(args.value)

  return (
    <div css={tw`w-72`}>
      <Dropdown
        values={args.values}
        value={option}
        onChange={(opt) => setOption(opt)}
        error={args.error}
        modified={args.modified}
        placeholder={args.placeholder}
        disabled={args.disabled}
      />
    </div>
  )
}

export const Basic = Template.bind({})

Basic.args = {
  values: ['Blue', 'Red', 'Purple'],
  value: undefined,
  error: false,
  modified: false,
  disabled: false,
  placeholder: 'Please select one',
}
