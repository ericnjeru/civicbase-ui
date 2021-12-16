import React from 'react'
import { Meta } from '@storybook/react'
import Survey from './Survey'
import tw from 'twin.macro'

export default {
  title: 'Forms/Survey',
  component: Survey,
} as Meta

export const Basic = () => (
  <div css={tw`w-screen max-w-screen-lg`}>
    <Survey />
  </div>
)
