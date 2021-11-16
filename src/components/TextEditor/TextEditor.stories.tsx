import { Meta } from '@storybook/react'
import tw from 'twin.macro'
import TextEditor from './TextEditor'

export default {
  title: 'Elements/TextEditor',
  component: TextEditor,
} as Meta

export const Basic = () => (
  <div css={tw`w-screen max-w-screen-lg`}>
    <TextEditor />
  </div>
)
