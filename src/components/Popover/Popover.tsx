import { ReactNode } from 'react'

import { Popover as HeadlessPopover } from '@headlessui/react'
import { FadeInOut } from 'components/Transition'
import tw from 'twin.macro'

const Popover = ({ children, action }: { children: ReactNode; action: ReactNode }) => {
  return (
    <HeadlessPopover css={tw`relative`}>
      {({ open }) => (
        <>
          <div>{open}</div>
          <HeadlessPopover.Button>{action}</HeadlessPopover.Button>
          <FadeInOut>
            <HeadlessPopover.Panel css={tw`absolute z-10 w-screen max-w-sm mt-3 transform -translate-x-1/2`}>
              <div css={tw`overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5`}>
                <div css={tw`p-3`}>{children}</div>
              </div>
            </HeadlessPopover.Panel>
          </FadeInOut>
        </>
      )}
    </HeadlessPopover>
  )
}

export default Popover
