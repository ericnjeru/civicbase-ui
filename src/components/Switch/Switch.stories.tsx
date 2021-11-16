import { useState } from 'react'
import { Meta } from '@storybook/react'
import Switch from './Switch'

export default {
  title: 'Elements/Switch',
  component: Switch,
} as Meta

export const Basic = () => {
  const [enabled, setEnabled] = useState(false)

  return <Switch enabled={enabled} setEnabled={setEnabled} />
}

export const WithLabel = () => {
  const [enabled, setEnabled] = useState(false)

  return (
    <Switch enabled={enabled} setEnabled={setEnabled}>
      Enable Notification
    </Switch>
  )
}
