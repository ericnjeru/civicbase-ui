import tw, { styled } from 'twin.macro'
import { Transition } from '@headlessui/react'
import { ReactNode } from 'react'

const StyledTransition = styled(Transition)`
  &.enter {
    ${tw`transition-opacity duration-150`}
  }
  &.enterFrom {
    ${tw`opacity-0`}
  }
  &.enterTo {
    ${tw`opacity-100`}
  }
  &.leave {
    ${tw`transition-opacity duration-300`}
  }
  &.leaveFrom {
    ${tw`opacity-100 translate-y-0`}
  }
  &.leaveTo {
    ${tw`opacity-0 -translate-y-full`}
  }
`

const FadeInOut = ({ children, show }: { children: ReactNode; show?: boolean }) => {
  return (
    <StyledTransition
      show={show}
      enter="enter"
      enterFrom="enterFrom"
      enterTo="enterTo"
      leave="leave"
      leaveFrom="leaveFrom"
      leaveTo="leaveTo"
    >
      {children}
    </StyledTransition>
  )
}

export default FadeInOut
