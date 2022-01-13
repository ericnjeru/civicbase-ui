import { Meta } from '@storybook/react'
import tw from 'twin.macro'
import Toast from '.'

export default {
  title: 'Components/Toast',
  component: Toast,
} as Meta

export const Basic = () => (
  <div css={tw`w-full h-full relative`}>
    <Toast />
  </div>
)
