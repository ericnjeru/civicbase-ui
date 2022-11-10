import { Meta } from '@storybook/react'
import tw from 'twin.macro'

import Header from './Header'

export default {
  title: 'Components/Header',
  component: Header,
} as Meta

export const Basic = () => (
  <div css={tw`w-screen flex justify-center h-80`}>
    <Header />
  </div>
)
