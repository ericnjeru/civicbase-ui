import { Dialog, Transition as HeadlessTransition } from '@headlessui/react'
import tw from 'twin.macro'
import * as Transition from 'components/Transition'
import Typography, { Subtitle } from 'components/Typography'
import { PrimaryButton } from 'components/Button'
import { Fragment } from 'react'

export default function CDialog({
  open,
  handleOpen,
  title,
  text,
  buttonText,
}: {
  open: boolean
  handleOpen: (open: boolean) => void
  title: string
  text: string
  buttonText: string
}) {
  return (
    <HeadlessTransition appear show={open} as={Fragment as any}>
      <Dialog css={tw`fixed inset-0 z-10 overflow-y-auto`} onClose={() => handleOpen(false)}>
        <div css={tw`min-h-screen px-4 text-center`}>
          <Transition.Primary>
            <Dialog.Overlay css={tw`fixed inset-0`} />
          </Transition.Primary>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span css={tw`inline-block h-screen align-middle`} aria-hidden="true">
            &#8203;
          </span>

          <Transition.Secondary>
            <div
              css={tw`inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl`}
            >
              <Dialog.Title>
                <Subtitle>{title}</Subtitle>
              </Dialog.Title>

              <div css={tw`mt-2`}>
                <Typography>{text}</Typography>
              </div>

              <div css={tw`mt-4`}>
                <PrimaryButton onClick={() => handleOpen(false)}>{buttonText}</PrimaryButton>
              </div>
            </div>
          </Transition.Secondary>
        </div>
      </Dialog>
    </HeadlessTransition>
  )
}
