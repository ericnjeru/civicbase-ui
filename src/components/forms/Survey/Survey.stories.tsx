import { ComponentMeta, ComponentStory } from '@storybook/react'
import tw from 'twin.macro'
import { createHistory, LocationProvider } from '@reach/router'
import Survey from './Survey'

export default {
  title: 'Forms/Survey',
  component: Survey,
} as ComponentMeta<typeof Survey>

const Template: ComponentStory<typeof Survey> = () => {
  const history = createHistory(window as any)

  return (
    <div css={tw`w-screen max-w-screen-lg h-screen`}>
      <LocationProvider history={history}>
        <Survey />
      </LocationProvider>
    </div>
  )
}

export const Basic = Template.bind({})

Basic.args = {}
