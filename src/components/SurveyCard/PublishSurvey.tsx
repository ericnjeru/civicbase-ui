import { BiPaperPlane } from 'react-icons/bi'

import { IconButton } from 'components/Button'
import Tooltip from 'components/Tooltip'
import useAsync from 'hooks/use-async'
import { publish } from 'services/survey'

const PublishSurvey = ({ surveyId }: { surveyId: string }) => {
  const { run, isLoading } = useAsync()

  const handlePublish = () => {
    run(publish(surveyId))
  }

  return (
    <Tooltip label="Publish" popperProps={{ delayShow: 500 }}>
      <IconButton onClick={handlePublish} disabled={isLoading}>
        <BiPaperPlane size={28} />
      </IconButton>
    </Tooltip>
  )
}

export default PublishSurvey
