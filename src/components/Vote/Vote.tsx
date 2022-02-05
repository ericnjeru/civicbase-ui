import { useState } from 'react'
import tw, { theme } from 'twin.macro'
import { IconButton } from 'components/Button'
import Dialog from 'components/Dialog'
import Typography, { Caption } from 'components/Typography'
import { IoIosThumbsDown, IoIosThumbsUp } from 'react-icons/io'

const Display = ({
  total,
  vote,
  creditSpent,
  token,
}: {
  total?: number
  vote: number
  creditSpent: number
  token: string
}) => {
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

      <Caption css={tw`mt-2`}>
        {creditSpent} {token}
      </Caption>
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
  token,
}: {
  thumbsUp?: string
  thumbsDown?: string
  handleVote: (direction: number) => void
  vote: number
  total?: number
  creditSpent: number
  canVoteUp: boolean
  canVoteDown: boolean
  token: string
}) => {
  const [openDialog, setOpenDialog] = useState(false)

  if (!thumbsDown && !thumbsUp && !total) {
    return null
  }

  const onVote = (direction: number) => {
    handleVote(direction)

    if ((direction > 0 && !canVoteUp) || (direction < 0 && !canVoteDown)) {
      setOpenDialog(true)
    }
  }

  return (
    <div css={tw`flex items-center`}>
      <Dialog
        open={openDialog}
        handleOpen={setOpenDialog}
        title={token}
        text={`You don't have enough ${token} to vote`}
        buttonText="Ok, I got it!"
      />

      <div css={tw`mx-6`}>
        <IconButton onClick={() => onVote(-1)}>
          <IoIosThumbsDown size={28} color={canVoteDown ? theme`colors.bgColor0` : theme`colors.bgColor8`} />
        </IconButton>
        <Typography>{thumbsDown}</Typography>
      </div>

      <Display vote={vote} total={total} creditSpent={creditSpent} token={token} />

      <div css={tw`mx-6`}>
        <IconButton onClick={() => onVote(1)}>
          <IoIosThumbsUp size={28} color={canVoteUp ? theme`colors.bgColor1` : theme`colors.bgColor8`} />
        </IconButton>
        <Typography>{thumbsUp}</Typography>
      </div>
    </div>
  )
}

export default Vote
