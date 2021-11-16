import { Meta } from '@storybook/react'
import tw from 'twin.macro'
import Dropdown from './Dropdown'

export default {
  title: 'Elements/Dropdown',
  component: Dropdown,
} as Meta

const options = ['option 1', 'option 2', 'option 3']

export const Basic = () => (
  <div css={tw`w-72`}>
    <Dropdown values={options} />
  </div>
)

export const Error = () => (
  <div css={tw`w-72`}>
    <Dropdown values={options} error={true} />
  </div>
)
