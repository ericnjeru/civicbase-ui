import tw, { styled } from 'twin.macro'

const TextLine = styled.div(() => tw`bg-gray-200 rounded-full animate-pulse`)

const Skeleton = () => {
  return (
    <div css={tw`p-4`}>
      <TextLine css={tw`h-6`} />
      <div css={tw`flex justify-between mt-3`}>
        <TextLine css={tw`h-8 w-16`} />
        <TextLine css={tw`h-8 w-20`} />
      </div>
    </div>
  )
}

export default Skeleton
