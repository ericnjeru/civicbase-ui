import { Meta } from '@storybook/react'
import tw from 'twin.macro'

import AddButton from './AddButton'

export default {
  title: 'Components/AddButton',
  component: AddButton,
} as Meta

export const Basic = () => (
  <div css={tw`w-72`}>
    <div css={tw`grid grid-cols-1 gap-8 align-middle py-4`}>
      <AddButton onClick={() => console.log('clicked')}>+ Create Survey</AddButton>
      <AddButton onClick={() => console.log('clicked')} css={tw`h-12`}>
        + Add Question
      </AddButton>
    </div>
  </div>
)
