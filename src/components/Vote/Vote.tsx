import { useContext, MouseEvent } from 'react'
import tw, { theme } from 'twin.macro'
import { HiInformationCircle } from 'react-icons/hi'
import { IoIosThumbsDown, IoIosThumbsUp } from 'react-icons/io'
import { IconButton, PrimaryButton } from 'components/Button'
import Typography, { Caption } from 'components/Typography'
import Modal, { ModalContext } from 'components/Modal'

export const Display = ({
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
    const size = (creditSpent / total) * 75
    const r = size < 0 ? size * -1 : size

    return r === 0 ? r : r + 25
  }

  return (
    <div css={tw`flex flex-col items-center`}>
      <div css={tw`h-28 w-28 border rounded-full flex justify-center items-center overflow-hidden relative`}>
        <div css={[tw`h-8 w-8 flex justify-center items-center z-10`, vote !== 0 && tw`text-black`]}>{vote}</div>
        <div
          style={{ width: `${getSize()}%`, height: `${getSize()}%` }}
          css={[
            tw`bg-red-200 absolute rounded-full`,
            tw`transition-all ease-in-out duration-700`,
            vote > 0 && tw`bg-green-200`,
          ]}
        />
      </div>

      <Caption css={tw`mt-2 dark:(text-white)`}>
        {creditSpent} {token}
      </Caption>
    </div>
  )
}

const Action = ({
  onVote,
  canVoteDown,
  thumbsDown,
  vote,
  total,
  creditSpent,
  token,
  canVoteUp,
  thumbsUp,
}: {
  onVote: (arg: number) => void
  canVoteDown: boolean
  thumbsDown?: string
  vote: number
  total?: number
  creditSpent: number
  token: string
  canVoteUp: boolean
  thumbsUp?: string
}) => {
  const { openModal } = useContext(ModalContext)

  const handleVoteUp = (e: MouseEvent<HTMLElement>) => {
    if (canVoteUp) {
      onVote(1)
    } else {
      openModal(e)
    }
  }

  const handleVoteDown = (e: MouseEvent<HTMLElement>) => {
    if (canVoteDown) {
      onVote(-1)
    } else {
      openModal(e)
    }
  }

  return (
    <>
      <div css={tw`mx-6`}>
        <IconButton onClick={handleVoteDown}>
          <IoIosThumbsDown size={28} color={canVoteDown ? theme`colors.bgColor0` : theme`colors.bgColor8`} />
        </IconButton>
        <Typography>{thumbsDown}</Typography>
      </div>

      <Display vote={vote} total={total} creditSpent={creditSpent} token={token} />

      <div css={tw`mx-6`}>
        <IconButton onClick={handleVoteUp}>
          <IoIosThumbsUp size={28} color={canVoteUp ? theme`colors.bgColor1` : theme`colors.bgColor8`} />
        </IconButton>
        <Typography>{thumbsUp}</Typography>
      </div>
    </>
  )
}

const Footer = () => {
  const { closeModal } = useContext(ModalContext)

  return <PrimaryButton onClick={closeModal}>Ok</PrimaryButton>
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
  if (!thumbsDown && !thumbsUp && !total) {
    return null
  }

  const onVote = (direction: number) => {
    handleVote(direction)
  }

  return (
    <div css={tw`flex items-center`}>
      <Modal
        header={<Typography css={tw`text-black`}>Out of {token}</Typography>}
        icon={<HiInformationCircle size="24" color={theme`colors.black`} />}
        action={
          <Action
            onVote={onVote}
            canVoteDown={canVoteDown}
            thumbsDown={thumbsDown}
            vote={vote}
            total={total}
            creditSpent={creditSpent}
            token={token}
            canVoteUp={canVoteUp}
            thumbsUp={thumbsUp}
          />
        }
        footer={<Footer />}
      >
        <Typography css={tw`text-black`}>You don&apos;t have enough {token} to cast this vote.</Typography>
      </Modal>
    </div>
  )
}

export default Vote
