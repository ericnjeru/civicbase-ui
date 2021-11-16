import tw from 'twin.macro'
import { cloneElement, ReactElement } from 'react'

const Accordion = ({
  children,
  active,
  handleClick,
}: {
  children: ReactElement[]
  active?: number
  handleClick: (index: number) => void
}) => {
  return (
    <div css={tw`flex flex-col w-full`}>
      {children.map((child, index) =>
        cloneElement(child, {
          active: active === index,
          handleClick: () => handleClick(index),
          key: child.props.title,
        }),
      )}
    </div>
  )
}

export default Accordion
