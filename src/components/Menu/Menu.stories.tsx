import { BiCog } from 'react-icons/bi'
import { Meta } from '@storybook/react'
import Menu from './Menu'
import { IconButton } from 'components/Button'

export default {
  title: 'Elements/Menu',
  component: Menu,
} as Meta

export const Basic = () => (
  <Menu>
    <IconButton>
      <BiCog size={28} />
    </IconButton>
  </Menu>
)
