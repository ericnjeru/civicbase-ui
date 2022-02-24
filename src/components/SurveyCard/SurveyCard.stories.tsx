import { ComponentStory, ComponentMeta } from '@storybook/react'
import { LocationProvider, createHistory } from '@reach/router'
import tw from 'twin.macro'
import { survey } from 'test/sample'
import SurveyCard from './SurveyCard'
import SkeletonCard from './Skeleton'

export default {
  title: 'Components/SurveyCard',
  component: SurveyCard,
} as ComponentMeta<typeof SurveyCard>

const Template: ComponentStory<typeof SurveyCard> = ({ survey }) => {
  const history = createHistory(window as any)
  return (
    <div style={{ width: 1000 }}>
      <LocationProvider history={history}>
        <div css={tw`grid grid-cols-3 gap-8 align-middle py-4`}>
          <SurveyCard survey={survey} />
          <SurveyCard survey={{ ...survey, status: 'finished' }} />
          <SurveyCard survey={{ ...survey, status: 'published' }} />
        </div>
      </LocationProvider>
    </div>
  )
}

const SkeletonTemplate: ComponentStory<typeof SkeletonCard> = () => {
  return (
    <div css={tw`grid grid-cols-3 gap-8 align-middle py-4`} style={{ width: 1000 }}>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  )
}

export const Skeleton = SkeletonTemplate.bind({})
export const Basic = Template.bind({})

Basic.args = { survey }
Skeleton.args = {}
