import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useForm, FormProvider } from 'react-hook-form'
import tw from 'twin.macro'
import EditText from './EditText'

export default {
  title: 'Components/EditText',
  component: EditText,
} as ComponentMeta<typeof EditText>

const Template: ComponentStory<typeof EditText> = () => {
  const methods = useForm({
    defaultValues: {
      text: '',
    },
  })

  return (
    <div css={tw`w-96`}>
      <FormProvider {...methods}>
        <EditText name="name" placeholder="Please add you name" />

        <EditText name="email" placeholder="Please add your email" />
      </FormProvider>
    </div>
  )
}

export const Basic = Template.bind({})

Basic.args = {}
