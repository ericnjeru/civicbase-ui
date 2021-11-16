import { Meta } from '@storybook/react'
import tw from 'twin.macro'
import DynamicBar from './DynamicBar'

export default {
  title: 'Components/DynamicBar',
  component: DynamicBar,
} as Meta

export const Basic = () => (
  <div css={tw`w-screen flex justify-center h-80`}>
    <div css={tw`w-5/6`}>
      <DynamicBar total={30} />
    </div>
  </div>
)
