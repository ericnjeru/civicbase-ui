import React from 'react'

import { Meta } from '@storybook/react'

import Button from './Button'
import DangerTextButton from './DangerTextButton'
import OutlinedButton from './OutlinedButton'
import PrimaryButton from './Primary'
import PrimaryTextButton from './PrimaryTextButton'
import SecondaryButton from './Secondary'
import TertiaryButton from './Tertiary'

export default {
  title: 'Elements/Button',
  component: Button,
} as Meta

export const Primary = () => <PrimaryButton>Primary Button</PrimaryButton>
export const Secondary = () => <SecondaryButton>Secondary Button</SecondaryButton>
export const Tertiary = () => <TertiaryButton>Tertiary Button</TertiaryButton>
export const DangerText = () => <DangerTextButton>Danger </DangerTextButton>
export const PrimaryText = () => <PrimaryTextButton>Primary Text </PrimaryTextButton>
export const PrimaryOutlined = () => <OutlinedButton>Primary Outlined Button </OutlinedButton>
export const Outlined = () => <OutlinedButton variant="light">Primary Outlined Button </OutlinedButton>
