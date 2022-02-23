import tw from 'twin.macro'
import * as Stats from 'components/Stats'

const Skeleton = () => {
  return (
    <div css={tw`mt-24`}>
      <Stats.List>
        <Stats.Skeleton />
        <Stats.Skeleton />
        <Stats.Skeleton />
        <Stats.Skeleton />
      </Stats.List>
    </div>
  )
}

export default Skeleton
