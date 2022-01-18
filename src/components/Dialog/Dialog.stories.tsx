import React, { useState } from 'react'
import { Meta } from '@storybook/react'
import Dialog from './Dialog'
import { PrimaryButton } from 'components/Button'

export default {
  title: 'Components/Dialog',
  component: Dialog,
} as Meta

export const Basic = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Dialog
        open={open}
        handleOpen={setOpen}
        title="Payment successful"
        text="Your payment has been successfully submitted. We’ve sent you an email with all of the details of your
                  order."
        buttonText="Got it, thanks!"
      />

      <PrimaryButton onClick={() => setOpen(true)}>Open Dialog</PrimaryButton>
    </>
  )
}
