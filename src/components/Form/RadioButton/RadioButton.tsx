import tw from 'twin.macro'
import { HTMLProps } from 'react'

const RadionButton = ({ ...props }: HTMLProps<HTMLInputElement>) => {
  return (
    <input
      css={tw`rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer`}
      type="radio"
      {...props}
    />
  )
}
export default RadionButton
