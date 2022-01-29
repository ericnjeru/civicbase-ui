import tw, { styled } from 'twin.macro'

const TextArea = styled.textarea(() => [
  tw`w-full p-2 text-sm`,
  tw`rounded-md border-2 border-gray-200 placeholder-gray-400`,
  tw`focus:(ring-2 ring-brand outline-none)`,
])

export default TextArea
