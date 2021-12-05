import { Meta } from '@storybook/react'
import Checkbox from './Checkbox'
import Label from 'components/Form/Label'
import tw from 'twin.macro'

export default {
  title: 'Elements/Checkbox',
  component: Checkbox,
} as Meta

export const Basic = () => (
  <>
    <Label css={tw`inline-flex space-x-4 items-center`}>
      <Checkbox />
      <span>Here is an example of checkbox with text</span>
    </Label>
  </>
)
