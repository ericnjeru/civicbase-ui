import { Meta } from '@storybook/react'
import SurveyCard from './SurveyCard'
import tw from 'twin.macro'

export default {
  title: 'Components/SurveyCard',
  component: SurveyCard,
} as Meta

export const Basic = () => (
  <div css={tw`grid grid-cols-3 gap-8 align-middle py-4`}>
    <SurveyCard status="pilot" title="Pilot Survey" method="quadratic" />
    <SurveyCard status="published" title="Published Survey" method="linear" />
    <SurveyCard status="finished" title="Finished Survey" method="quadratic" />
  </div>
)
