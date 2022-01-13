import tw from 'twin.macro'
import { FC } from 'react'
import { RouteComponentProps, useNavigate } from '@reach/router'
import SurveyCard from 'components/SurveyCard'
import AddButton from 'components/AddButton'
import { useSurveys, SurveyState } from 'contexts/surveys'

const Dashboard: FC<RouteComponentProps> = () => {
  const navigate = useNavigate()
  const { surveys } = useSurveys()

  return (
    <div css={tw`grid mobile:grid-cols-1 tablet:grid-cols-2 grid-cols-3  gap-8 py-8 mx-4`}>
      {surveys && surveys.map((survey: SurveyState) => <SurveyCard survey={survey} key={survey.id} />)}

      <AddButton onClick={() => navigate(`/create-survey`)}>+ Create Survey</AddButton>
    </div>
  )
}

export default Dashboard
