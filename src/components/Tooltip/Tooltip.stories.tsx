import { Meta } from '@storybook/react'
import tw from 'twin.macro'
import Tooltip from './Tooltip'

export default {
  title: 'Elements/Tooltip ',
  component: Tooltip,
} as Meta

export const Basic = () => {
  return (
    <Tooltip placement="right" tip="This is an example">
      <button
        css={tw`m-2 bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150`}
        type="button"
      >
        Hover on me
      </button>
    </Tooltip>
  )
}
