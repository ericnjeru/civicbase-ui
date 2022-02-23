import Spinner from 'components/Spinner'
import tw from 'twin.macro'

const Loading = () => {
  return (
    <div css={tw`mt-16`}>
      <Spinner />
    </div>
  )
}

export default Loading
