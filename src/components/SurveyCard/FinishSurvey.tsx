import { useEffect, useCallback } from 'react'
import useAsync from 'hooks/use-async'
import { IconButton } from 'components/Button'
import { FiPower } from 'react-icons/fi'
import { finish } from 'services/survey'
import { useSurveys, SurveyActionKind } from 'contexts/surveys'

const FinishSurvey = ({ surveyId }: { surveyId: string }) => {
  const { dispatch, isLoading } = useSurveys()
  const { run, isError, isSuccess } = useAsync()

  const setLoading = useCallback(
    (isLoading: boolean) => dispatch({ type: SurveyActionKind.LOADING, payload: { id: surveyId, isLoading } }),
    [dispatch, surveyId],
  )

  useEffect(() => {
    if (isError || isSuccess) {
      setLoading(false)
      dispatch({ type: SurveyActionKind.UPDATE, payload: { id: surveyId, status: 'finished' } })
    }
  }, [isError, isSuccess, setLoading, surveyId, dispatch])

  const handlePublish = () => {
    setLoading(true)
    run(finish(surveyId))
  }

  return (
    <IconButton onClick={handlePublish} disabled={isLoading}>
      <FiPower size={28} />
    </IconButton>
  )
}

export default FinishSurvey
