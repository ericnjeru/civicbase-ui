import { useCallback, useEffect } from 'react'
import tw from 'twin.macro'
import { AiOutlineDelete, AiOutlineCopy } from 'react-icons/ai'
import { FaRegClone } from 'react-icons/fa'
import copy from 'copy-to-clipboard'
import { IconButton } from 'components/Button'
import useAsync from 'hooks/use-async'
import { deleteSurvey, clone } from 'services/survey'
import { useSurveys, SurveyActionKind } from 'contexts/surveys'
import { useToast } from 'contexts/toast'
import Tooltip from 'components/Tooltip'

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
      <Tooltip placement="bottom" tip="Copy link">
        <IconButton onClick={handleCopy}>
          <AiOutlineCopy size={28} />
        </IconButton>
      </Tooltip>

      <Tooltip placement="bottom" tip="Clone">
        <IconButton onClick={handleClone} disabled={isLoading}>
          <FaRegClone size={28} />
        </IconButton>
      </Tooltip>

      <Tooltip placement="bottom" tip="Delete">
        <IconButton onClick={handleDelete} disabled={isLoading}>
          <AiOutlineDelete size={28} />
        </IconButton>
      </Tooltip>
    </div>
  )
}

export default InlineMenu
