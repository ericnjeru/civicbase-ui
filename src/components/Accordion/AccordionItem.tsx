import tw from 'twin.macro'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import { ReactNode } from 'react'
import { Subtitle } from 'components/Typography'

const AccordionItem = ({
  title,
  children,
  handleClick,
  active,
}: {
  title: string
  children: ReactNode
  handleClick?: () => void
  active?: boolean
}) => {
  const handleKeyDown = () => {
    //   TODO:
  }

  return (
    <div css={tw`border-t-2`}>
      <div
        css={tw`flex justify-between py-4 w-full`}
        onClick={handleClick}
        role="button"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <Subtitle css={tw`mb-0`}>{title}</Subtitle>
        <div css={tw`flex flex-col`}>{active ? <BsChevronUp /> : <BsChevronDown />}</div>
      </div>
      <div css={[!active ? tw`hidden` : tw`block pb-4`, tw`transition-all ease-in-out duration-700`]}>{children}</div>
    </div>
  )
}

export default AccordionItem
