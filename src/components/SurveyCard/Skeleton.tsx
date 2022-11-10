import Card from 'components/Card'
import tw, { styled } from 'twin.macro'

import Ping from './Ping'

const TextLine = styled.div(() => tw`bg-gray-200 rounded-full animate-pulse`)

const Skeleton = () => {
  return (
    <Card
      css={[
        tw`w-full h-40 border-l-4 border-t-0 border-r-0 border-b-0 border-gray-200 animate-pulse flex flex-col justify-between`,
      ]}
    >
      <div css={tw`flex justify-between items-center`}>
        <TextLine css={tw`h-8 w-24`} />
        <Ping />
      </div>

      <div css={tw`flex`}>
        <TextLine css={tw`w-14 h-6 mr-1`} /> <TextLine css={tw`w-14 h-6`} />
      </div>
    </Card>
  )
}

export default Skeleton
