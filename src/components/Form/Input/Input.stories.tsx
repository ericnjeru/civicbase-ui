import { Meta } from '@storybook/react'
import Input from './Input'
import Label from 'components/Form/Label'

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
