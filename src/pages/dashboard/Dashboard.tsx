import tw from 'twin.macro'
import SurveyCard from 'components/SurveyCard'
import AddButton from 'components/AddButton'

const Dashboard = () => {
  return (
    <div css={tw`grid mobile:grid-cols-1 tablet:grid-cols-2 grid-cols-3  gap-8`}>
      <SurveyCard status="pilot" title="Pilot Survey" method="quadratic" />
      <SurveyCard status="published" title="Published Survey" method="linear" />
      <SurveyCard status="finished" title="Finished Survey" method="quadratic" />
      <SurveyCard status="pilot" title="Pilot Survey" method="quadratic" />
      <SurveyCard status="published" title="Published Survey" method="linear" />
      <SurveyCard status="finished" title="Finished Survey" method="quadratic" />
      <SurveyCard status="pilot" title="Pilot Survey" method="quadratic" />
      <SurveyCard status="published" title="Published Survey" method="linear" />
      <AddButton onClick={() => console.log('clicked')}>+ Create Survey</AddButton>
    </div>
  )
}

export default Dashboard
