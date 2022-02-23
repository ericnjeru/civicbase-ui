import tw, { styled } from 'twin.macro'

const TextLine = styled.div(() => tw`bg-gray-200 rounded-full animate-pulse`)

const Skeleton = () => {
  return (
    <div css={tw`w-full flex items-center flex-col`}>
      <TextLine css={tw`h-7 mb-8 w-1/3`} />
      <TextLine css={tw`h-14 mb-5 w-1/3`} />

      <TextLine css={tw`h-6 w-full max-w-2xl mb-2`} />
      <TextLine css={tw`h-6 w-full max-w-2xl`} />
    </div>
  )
}

export default Skeleton
