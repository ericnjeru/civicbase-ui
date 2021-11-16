import React from 'react'
import { Meta } from '@storybook/react'
import SurveyForm from './SurveyForm'
import tw from 'twin.macro'

export default {
  title: 'Forms/Survey',
  component: SurveyForm,
} as Meta

export const Basic = () => (
  <div css={tw`w-screen max-w-screen-lg`}>
    <SurveyForm />
  </div>
)
