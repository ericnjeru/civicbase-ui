import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BannerProvider } from 'contexts/banner'
import tw from 'twin.macro'
import Banner from './Banner'

export default {
  title: 'Components/Banner',
  component: Banner,
} as ComponentMeta<typeof Banner>

const Template: ComponentStory<typeof Banner> = (args) => (
  <div css={tw`w-screen`}>
    <div css={tw`container`}>
      <BannerProvider {...args}>
        <Banner />
      </BannerProvider>
    </div>
  </div>
)

export const Basic = Template.bind({})

Basic.args = { value: { show: true, title: 'title', subtitle: 'subtitle', actionText: 'action', action: () => {} } }
