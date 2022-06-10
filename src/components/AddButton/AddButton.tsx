import { ButtonHTMLAttributes, ReactNode } from 'react'
import tw from 'twin.macro'
import { Title } from 'components/Typography'

const AddButton = ({
  children,
  ...props
}: { children: string | ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      css={[
        tw`transition-all ease-in-out duration-300`,
        tw`w-full h-40 border-dashed border-2 rounded-md text-gray-500`,
        tw`flex justify-center items-center`,
        tw`dark:(text-gray-400 border-gray-400 hover:(border-gray-100 text-gray-100))`,
        !props?.disabled && tw`hover:border-gray-600 hover:text-gray-600 focus:outline-none`,
      ]}
      {...props}
      type="button"
    >
      <Title css={tw`text-current m-0`}>{children}</Title>
    </button>
  )
}

export default AddButton
