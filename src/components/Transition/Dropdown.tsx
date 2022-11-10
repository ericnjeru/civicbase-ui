import { ReactNode } from 'react'

import { Transition } from '@headlessui/react'
import tw, { styled } from 'twin.macro'

const StyledTransition = styled(Transition)`
  &.enter {
    ${tw`transition ease-out duration-100`}
  }
  &.enterFrom {
    ${tw`transform opacity-0 scale-95`}
  }
  &.enterTo {
    ${tw`transform opacity-100 scale-100`}
  }
  &.leave {
    ${tw`transition ease-in duration-75`}
  }
  &.leaveFrom {
    ${tw`transform opacity-100 scale-100`}
  }
  &.leaveTo {
    ${tw`transform opacity-0 scale-95`}
  }
`

const Dropdown = ({ children }: { children: ReactNode }) => {
  return <StyledTransition>{children}</StyledTransition>
}

export default Dropdown
