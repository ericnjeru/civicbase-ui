import { Meta } from '@storybook/react'
import SurveyCard from './SurveyCard'
import tw from 'twin.macro'

export default {
  title: 'Components/SurveyCard',
  component: SurveyCard,
} as Meta

export const Basic = () => {
  const survey: any = {
    status: 'pilot',
    setup: {
      credits: 100,
      topic: 'Pilot Survey',
      method: 'Quadratic',
    },
    id: '123',
    isLoading: false,
  }

  return (
    <div css={tw`grid grid-cols-3 gap-8 align-middle py-4`}>
      <SurveyCard survey={survey} />
      <SurveyCard survey={{ ...survey, status: 'finished' }} />
      <SurveyCard survey={{ ...survey, status: 'published' }} />
    </div>
  )
}
