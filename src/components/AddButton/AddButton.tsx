import { ButtonHTMLAttributes, ReactNode } from 'react'
import tw from 'twin.macro'
import { Title } from 'components/Typography'

const AddButton = ({
  children,
  onClick,
  disabled,
  ...props
}: { children: string | ReactNode; onClick: () => void } & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      css={[
        tw`w-full h-40 border-dashed border-2 rounded-md text-gray-500`,
        tw`flex justify-center items-center`,
        tw`dark:(text-gray-400 border-gray-400 hover:(border-gray-100 text-gray-100))`,
        !disabled && tw`hover:border-gray-600 hover:text-gray-600 focus:outline-none`,
      ]}
      onClick={onClick}
      disabled={disabled}
      {...props}
      type="button"
    >
      <Title css={tw`text-current m-0`}>{children}</Title>
    </button>
  )
}

export default AddButton
