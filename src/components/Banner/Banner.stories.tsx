import { Meta } from '@storybook/react'
import tw from 'twin.macro'
import Banner from './Banner'

export default {
  title: 'Elements/Banner',
  component: Banner,
} as Meta

export const Basic = () => (
  <div css={tw`w-screen flex justify-center h-80`}>
    <div css={tw`w-5/6`}>
      <Banner />
    </div>
  </div>
)
