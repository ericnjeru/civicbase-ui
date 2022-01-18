import { Fragment, ReactNode } from 'react'
import tw, { styled } from 'twin.macro'
import { Transition } from '@headlessui/react'

const StyledMainTransition = styled(Transition.Child)`
  &.enter {
    ${tw`ease-out duration-300`}
  }
  &.enterFrom {
    ${tw`opacity-0`}
  }
  &.enterTo {
    ${tw`opacity-100`}
  }
  &.leave {
    ${tw`ease-in duration-200`}
  }
  &.leaveFrom {
    ${tw`opacity-100`}
  }
  &.leaveTo {
    ${tw`opacity-0`}
  }
`

const StyledSecondaryTransition = styled(Transition.Child)`
  &.enter {
    ${tw`ease-out duration-300`}
  }
  &.enterFrom {
    ${tw`opacity-0 scale-95`}
  }
  &.enterTo {
    ${tw`opacity-100 scale-100`}
  }
  &.leave {
    ${tw`ease-in duration-200`}
  }
  &.leaveFrom {
    ${tw`opacity-100 scale-100`}
  }
  &.leaveTo {
    ${tw`opacity-0 scale-95`}
  }
`

export const Primary = ({ children }: { children: ReactNode }) => {
  return (
    <StyledMainTransition
      as={Fragment as any}
      enter="enter"
      enterFrom="enterFrom"
      enterTo="enterTo"
      leave="leave"
      leaveFrom="leaveFrom"
      leaveTo="leaveTo"
    >
      {children}
    </StyledMainTransition>
  )
}

export const Secondary = ({ children }: { children: ReactNode }) => {
  return (
    <StyledSecondaryTransition
      as={Fragment as any}
      enter="enter"
      enterFrom="enterFrom"
      enterTo="enterTo"
      leave="leave"
      leaveFrom="leaveFrom"
      leaveTo="leaveTo"
    >
      {children}
    </StyledSecondaryTransition>
  )
}
