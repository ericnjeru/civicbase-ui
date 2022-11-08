import { FC, useEffect } from 'react'

import { RouteComponentProps, useNavigate } from '@reach/router'
import { useActor } from '@xstate/react'
import AddButton from 'components/AddButton'
import SurveyCard, { Skeleton } from 'components/SurveyCard'
import { useDashboard } from 'contexts/dashboard'
import tw from 'twin.macro'

import { SurveyDashboard } from '../../../types/survey'

const Dashboard: FC<RouteComponentProps> = () => {
  const dashboardService = useDashboard()
  const [state, send] = useActor(dashboardService)
  const navigate = useNavigate()

  useEffect(() => {
    send('FETCH')
  }, [send])

  return (
    <div css={tw`grid mobile:grid-cols-1 tablet:grid-cols-2 grid-cols-3  gap-8 py-8 mx-4`}>
      <AddButton onClick={() => navigate(`/surveyForm`)}>+ Create Survey</AddButton>

      {state.context.surveys?.map((survey: SurveyDashboard) => (
        <SurveyCard survey={survey} key={survey.id} />
      ))}

      {state.matches('loading') && [1, 2, 3, 4, 5].map((k) => <Skeleton key={k} />)}
    </div>
  )
}

export default Dashboard
