import { useCallback, useContext, useEffect } from 'react'
import tw, { theme } from 'twin.macro'
import { AiOutlineDelete, AiOutlineCopy } from 'react-icons/ai'
import { FaRegClone } from 'react-icons/fa'
import copy from 'copy-to-clipboard'
import { IconButton, SecondaryButton } from 'components/Button'
import useAsync from 'hooks/use-async'
import { deleteSurvey, clone } from 'services/survey'
import { useSurveys, SurveyActionKind } from 'contexts/surveys'
import { useToast } from 'contexts/toast'
import Modal, { ModalContext } from 'components/Modal'
import Typography from 'components/Typography'
import { HiInformationCircle } from 'react-icons/hi'
import Tooltip from 'components/Tooltip'

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
  const { dispatch } = useSurveys()
  const { run, data, isLoading } = useAsync()
  const { trigger } = useToast()

  const setLoading = useCallback(
    (isLoading: boolean) => dispatch({ type: SurveyActionKind.LOADING, payload: { id: surveyId, isLoading } }),
    [dispatch, surveyId],
  )

  const handleCopy = () => {
    copy(`${window.location.href}survey/${surveyId}`)
    trigger('Copied to clipboard!')
  }

  const handleDelete = () => {
    setLoading(true)
    run(deleteSurvey(surveyId))
  }

  const handleClone = () => {
    setLoading(true)
    run(clone(surveyId))
  }

  // CLONE
  useEffect(() => {
    if (data && data.id) {
      dispatch({ type: SurveyActionKind.ADD, payload: data })
      setLoading(false)
    }
  }, [data, dispatch, setLoading])

  useEffect(() => {
    if (data && data.message === 'Deleted.') {
      dispatch({ type: SurveyActionKind.DELETE, payload: { id: surveyId } })
      setLoading(false)
    }
  }, [surveyId, data, dispatch, setLoading])

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
