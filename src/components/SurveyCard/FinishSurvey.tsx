import { FiPower } from 'react-icons/fi'

import { IconButton } from 'components/Button'
import Tooltip from 'components/Tooltip'
import useAsync from 'hooks/use-async'
import { finish } from 'services/survey'

const FinishSurvey = ({ surveyId }: { surveyId: string }) => {
  const { run, isLoading } = useAsync()

  const handleFinish = () => {
    run(finish(surveyId))
  }

  return (
    <Tooltip label="Finish" popperProps={{ delayShow: 500 }}>
      <IconButton onClick={handleFinish} disabled={isLoading}>
        <FiPower size={28} />
      </IconButton>
    </Tooltip>
  )
}

export default FinishSurvey
