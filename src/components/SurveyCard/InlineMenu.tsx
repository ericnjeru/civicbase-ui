import { useContext } from 'react'
import { AiOutlineDelete, AiOutlineCopy } from 'react-icons/ai'
import { FaRegClone } from 'react-icons/fa'
import { HiInformationCircle } from 'react-icons/hi'

import { IconButton, SecondaryButton } from 'components/Button'
import Modal, { ModalContext } from 'components/Modal'
import Tooltip from 'components/Tooltip'
import Typography from 'components/Typography'
import { useToast } from 'contexts/toast'
import copy from 'copy-to-clipboard'
import useAsync from 'hooks/use-async'
import { deleteSurvey, clone } from 'services/survey'
import tw, { theme } from 'twin.macro'

const Action = ({ isLoading }: { isLoading: boolean }) => {
  const { openModal } = useContext(ModalContext)

  return (
    <Tooltip label="Delete" popperProps={{ delayShow: 500 }}>
      <IconButton onClick={openModal} disabled={isLoading}>
        <AiOutlineDelete size={28} />
      </IconButton>
    </Tooltip>
  )
}

const InlineMenu = ({ surveyId }: { surveyId: string }) => {
  const { run, isLoading } = useAsync()
  const { trigger } = useToast()

  const handleCopy = () => {
    copy(`${window.location.href}survey/${surveyId}`)
    trigger('Copied to clipboard!')
  }

  const handleDelete = () => {
    run(deleteSurvey(surveyId))
  }

  const handleClone = () => {
    run(clone(surveyId))
  }

  return (
    <div css={tw`justify-around w-full flex`}>
      <Tooltip label="Copy link" popperProps={{ delayShow: 500 }}>
        <IconButton onClick={handleCopy}>
          <AiOutlineCopy size={28} />
        </IconButton>
      </Tooltip>

      <Tooltip label="Clone" popperProps={{ delayShow: 500 }}>
        <IconButton onClick={handleClone} disabled={isLoading}>
          <FaRegClone size={28} />
        </IconButton>
      </Tooltip>

      <Modal
        header={<Typography css={tw`text-black`}>Delete Survey</Typography>}
        icon={<HiInformationCircle size="24" color={theme`colors.black`} />}
        action={<Action isLoading={isLoading} />}
        footer={
          <SecondaryButton onClick={handleDelete} disabled={isLoading}>
            Confirm
          </SecondaryButton>
        }
      >
        <Typography css={tw`text-black`}>
          Are you sure you want to delete this survey and all the answers linked to this survey? This operation is
          irreversible!
        </Typography>
      </Modal>
    </div>
  )
}

export default InlineMenu
