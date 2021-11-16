import React from 'react'
import { Meta } from '@storybook/react'
import Card from './Card'

export default {
  title: 'Elements/Card',
  component: Card,
} as Meta

export const Basic = () => <Card>Something</Card>
