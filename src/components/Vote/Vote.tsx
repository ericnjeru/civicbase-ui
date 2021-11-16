import { IconButton } from 'components/Button'
import Typography from 'components/Typography'
import { useState } from 'react'
import { IoIosThumbsDown, IoIosThumbsUp } from 'react-icons/io'
import tw, { theme } from 'twin.macro'

const Display = ({ total, votes, isPositive }: { total: number; votes: number; isPositive: boolean }) => {
  return (
    <div css={tw`h-28 w-28 border rounded-full flex justify-center items-center overflow-hidden relative`}>
      <div css={tw`h-8 w-8 border rounded-full flex justify-center items-center bg-white z-10`}>{votes}</div>
      <div
        style={{ width: `${total}%`, height: `${total}%` }}
        css={[
          tw`bg-red-200 absolute rounded-full`,
          tw`transition-all ease-in-out duration-700`,
          isPositive && tw`bg-green-200`,
        ]}
      />
    </div>
  )
}

const Vote = ({ voteUpLabel, voteDownLabel }: { voteUpLabel: string; voteDownLabel: string }) => {
  const [isPositive, setPositive] = useState(false)
  const [votes, setVotes] = useState(0)

  const handleVote = () => {
    //   TODO:
    const x = Math.floor(Math.random() * (100 - 1 + 1) + 1)
    setVotes(x)
  }

  const handleVoteUp = () => {
    setPositive(true)
    handleVote()
  }
  const handleVoteDown = () => {
    setPositive(false)
    handleVote()
  }

  return (
    <div css={tw`flex items-center`}>
      <div css={tw`mx-6`}>
        <IconButton onClick={handleVoteUp}>
          <IoIosThumbsUp size={28} color={theme`colors.bgColor1`} />
        </IconButton>
        <Typography>{voteUpLabel}</Typography>
      </div>
      <Display votes={44} total={votes} isPositive={isPositive} />

      <div css={tw`mx-6`}>
        <IconButton onClick={handleVoteDown}>
          <IoIosThumbsDown size={28} color={theme`colors.bgColor0`} />
        </IconButton>
        <Typography>{voteDownLabel}</Typography>
      </div>
    </div>
  )
}

export default Vote
