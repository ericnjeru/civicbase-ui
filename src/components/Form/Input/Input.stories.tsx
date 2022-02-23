// import { Meta } from '@storybook/react'
import { IconButton } from 'components/Button'
import { AiOutlineClose } from 'react-icons/ai'
// import Input from './Input'
import Label from 'components/Form/Label'
// import tw from 'twin.macro'
import CustomInput from './CustomInput'
import { useForm, FormProvider } from 'react-hook-form'
import { ComponentMeta, ComponentStory } from '@storybook/react'
// import { useState } from 'react'
import tw from 'twin.macro'
import Input from './Input'

export default {
  title: 'Elements/Input',
  component: Input,
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = (args) => {
  return (
    <div css={tw`w-72`}>
      <Label>Name</Label>
      <Input error={args.error} modified={args.modified} disabled={args.disabled} />
    </div>
  )
}

export const Basic = Template.bind({})

Basic.args = {
  error: false,
  modified: false,
  disabled: false,
}

const CustomTemplate: ComponentStory<typeof CustomInput> = () => {
  const methods = useForm()

  return (
    <div css={tw`w-72`}>
      <FormProvider {...methods}>
        <Label>Name</Label>
        <CustomInput index="TST" name="field">
          <IconButton onClick={() => {}} css={tw`hover:bg-red-50 mr-1`}>
            <AiOutlineClose />
          </IconButton>
        </CustomInput>
      </FormProvider>
    </div>
  )
}

export const Custom = CustomTemplate.bind({})

Custom.args = {}
