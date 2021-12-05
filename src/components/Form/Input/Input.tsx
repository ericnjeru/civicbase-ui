import tw, { styled } from 'twin.macro'

const Input = styled.input<{ error?: boolean; modified?: boolean }>(({ error, modified }) => [
  tw`h-10 w-full px-2 text-sm leading-none bg-transparent`,
  tw`rounded-md border-2 border-gray-200 placeholder-gray-400`,
  tw`focus:outline-none focus:ring focus:border-blue-300`,
  modified && tw`border-indigo-600 border-opacity-60`,
  error && tw`border-error-600 border-opacity-60`,
])

export default Input
