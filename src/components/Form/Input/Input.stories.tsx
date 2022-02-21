import { Meta } from '@storybook/react'
import { IconButton } from 'components/Button'
import { AiOutlineClose } from 'react-icons/ai'
import Input from './Input'
import Label from 'components/Form/Label'
import tw from 'twin.macro'
import CustomInput from './CustomInput'
import { useForm, FormProvider } from 'react-hook-form'

export default {
  title: 'Elements/Input',
  component: Input,
} as Meta

export const Basic = () => (
  <>
    <Label>Name</Label>
    <Input />
  </>
)

export const WithError = () => (
  <>
    <Label>Name</Label>
    <Input error={true} />
  </>
)

export const Custom = () => {
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      <Label>Name</Label>
      <CustomInput index="TST" name="field">
        <IconButton onClick={() => {}} css={tw`hover:bg-red-50 mr-1`}>
          <AiOutlineClose />
        </IconButton>
      </CustomInput>
    </FormProvider>
  )
}
export const CustomWithoutActionButton = () => {
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      <Label>Name</Label>
      <CustomInput index="TST" name="field" />
    </FormProvider>
  )
}
