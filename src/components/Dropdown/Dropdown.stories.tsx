import { Meta } from '@storybook/react'
import { useState } from 'react'
import tw from 'twin.macro'
import Dropdown from './Dropdown'

export default {
  title: 'Elements/Dropdown',
  component: Dropdown,
} as Meta

const options = ['option 1', 'option 2', 'option 3']

export const Basic = () => {
  const [option, setOption] = useState('option 1')

  return (
    <div css={tw`w-72`}>
      <Dropdown values={options} value={option} onChange={(opt) => setOption(opt)} />
    </div>
  )
}

export const Error = () => {
  const [option, setOption] = useState('option 1')

  return (
    <div css={tw`w-72`}>
      <Dropdown values={options} error={true} value={option} onChange={(opt) => setOption(opt)} />
    </div>
  )
}
