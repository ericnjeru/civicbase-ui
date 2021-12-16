import tw from 'twin.macro'
import { FC } from 'react'
import { RouteComponentProps } from '@reach/router'
import SurveyCard from 'components/SurveyCard'
import AddButton from 'components/AddButton'
import { useNavigate } from '@reach/router'

const Dashboard: FC<RouteComponentProps> = () => {
  const navigate = useNavigate()

  return (
    <div css={tw`grid mobile:grid-cols-1 tablet:grid-cols-2 grid-cols-3  gap-8 py-8 mx-4`}>
      <SurveyCard status="pilot" title="Pilot Survey" method="quadratic" />
      <SurveyCard status="published" title="Published Survey" method="linear" />
      <SurveyCard status="finished" title="Finished Survey" method="quadratic" />
      <SurveyCard status="pilot" title="Pilot Survey" method="quadratic" />
      <SurveyCard status="published" title="Published Survey" method="linear" />
      <SurveyCard status="finished" title="Finished Survey" method="quadratic" />
      <SurveyCard status="pilot" title="Pilot Survey" method="quadratic" />
      <SurveyCard status="published" title="Published Survey" method="linear" />
      <AddButton onClick={() => navigate(`/create-survey`)}>+ Create Survey</AddButton>
    </div>
  )
}

export default Dashboard
