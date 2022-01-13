import { useEffect, useCallback } from 'react'
import useAsync from 'hooks/use-async'
import { BiPaperPlane } from 'react-icons/bi'
import { IconButton } from 'components/Button'
import { publish } from 'services/survey'
import { useSurveys, SurveyActionKind } from 'contexts/surveys'

const PublishSurvey = ({ surveyId }: { surveyId: string }) => {
  const { dispatch, isLoading } = useSurveys()
  const { run, isError, isSuccess } = useAsync()

  const setLoading = useCallback(
    (isLoading: boolean) => dispatch({ type: SurveyActionKind.LOADING, payload: { id: surveyId, isLoading } }),
    [dispatch, surveyId],
  )

  useEffect(() => {
    if (isError || isSuccess) {
      setLoading(false)
      dispatch({ type: SurveyActionKind.UPDATE, payload: { id: surveyId, status: 'published' } })
    }
  }, [isError, isSuccess, setLoading, surveyId, dispatch])

  const handlePublish = () => {
    setLoading(true)
    run(publish(surveyId))
  }

  return (
    <IconButton onClick={handlePublish} disabled={isLoading}>
      <BiPaperPlane size={28} />
    </IconButton>
  )
}

export default PublishSurvey
