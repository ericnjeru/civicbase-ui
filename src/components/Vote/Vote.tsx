import { IconButton } from 'components/Button'
import Typography, { Caption } from 'components/Typography'
import { IoIosThumbsDown, IoIosThumbsUp } from 'react-icons/io'
import tw, { theme } from 'twin.macro'

const Display = ({ total, vote, creditSpent }: { total?: number; vote: number; creditSpent: number }) => {
  if (!total) {
    return null
  }

  const getSize = () => {
    const size = (creditSpent / total) * 100
    const r = size < 0 ? size * -1 : size

    if (r === 0) {
      return 0
    }

    if (r < 25) {
      return 25
    }

    return r
  }

  return (
    <div css={tw`flex flex-col items-center`}>
      <div css={tw`h-28 w-28 border rounded-full flex justify-center items-center overflow-hidden relative`}>
        <div css={tw`h-8 w-8  flex justify-center items-center  z-10`}>{vote}</div>
        <div
          style={{ width: `${getSize()}%`, height: `${getSize()}%` }}
          css={[
            tw`bg-red-200 absolute rounded-full`,
            tw`transition-all ease-in-out duration-700`,
            vote > 0 && tw`bg-green-200`,
          ]}
        />
      </div>

      <Caption css={tw`mt-2`}>{creditSpent} Credits</Caption>
    </div>
  )
}

const Vote = ({
  thumbsUp,
  thumbsDown,
  handleVote,
  vote,
  total,
  creditSpent,
  canVoteUp,
  canVoteDown,
}: {
  thumbsUp?: string
  thumbsDown?: string
  handleVote: (direction: number) => void
  vote: number
  total?: number
  creditSpent: number
  canVoteUp: boolean
  canVoteDown: boolean
}) => {
  if (!thumbsDown && !thumbsUp && !total) {
    return null
  }

  return (
    <div css={tw`flex items-center`}>
      <div css={tw`mx-6`}>
        <IconButton onClick={() => handleVote(-1)} disabled={!canVoteDown}>
          <IoIosThumbsDown size={28} color={canVoteDown ? theme`colors.bgColor0` : theme`colors.bgColor8`} />
        </IconButton>
        <Typography>{thumbsDown}</Typography>
      </div>

      <Display vote={vote} total={total} creditSpent={creditSpent} />

      <div css={tw`mx-6`}>
        <IconButton onClick={() => handleVote(1)} disabled={!canVoteUp}>
          <IoIosThumbsUp size={28} color={canVoteUp ? theme`colors.bgColor1` : theme`colors.bgColor8`} />
        </IconButton>
        <Typography>{thumbsUp}</Typography>
      </div>
    </div>
  )
}

export default Vote
