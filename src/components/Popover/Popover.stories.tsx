import { Meta } from '@storybook/react'
import tw from 'twin.macro'

import Popover from './Popover'

export default {
  title: 'Elements/Popover',
  component: Popover,
} as Meta

export const Basic = () => (
  <div css={tw`w-screen max-w-screen-lg`}>
    <Popover action={<div>test</div>}>Something cool</Popover>
  </div>
)
