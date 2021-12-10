import { Meta } from '@storybook/react'
import Spinner from './Spinner'

export default {
  title: 'Elements/Spinner',
  component: Spinner,
} as Meta

export const Basic = () => {
  return <Spinner />
}
