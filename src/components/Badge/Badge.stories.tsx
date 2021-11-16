import { Meta } from '@storybook/react'
import Badge from './Badge'

export default {
  title: 'Elements/Badge',
  component: Badge,
} as Meta

export const Basic = () => <Badge>Badge</Badge>

export const Dark = () => <Badge variant="dark">Badge</Badge>
