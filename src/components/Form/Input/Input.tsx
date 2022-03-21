import tw, { styled } from 'twin.macro'

const Input = styled.input<{ error?: boolean; modified?: boolean }>(({ error, modified }) => [
  tw`h-10 w-full px-2 text-sm leading-none bg-white`,
  tw`rounded-md border-2 border-gray-200 placeholder-gray-400`,
  tw`focus:outline-none focus:(ring-2 ring-blue-300 border-blue-300)`,
  tw`dark:(text-white bg-gray-700 border-gray-600)`,
  modified && tw`border-indigo-600 border-opacity-60`,
  error && tw`border-error-300 border-opacity-60 focus:(ring-2 ring-red-300 border-red-300)`,
])

export default Input
