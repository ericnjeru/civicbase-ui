import { FC } from 'react'
import { RouteComponentProps } from '@reach/router'
import useSurvey from 'hooks/use-survey'
import * as Survey from 'features/Survey'
import { MetadataProvider } from 'contexts/metadata'

const Respondent: FC<RouteComponentProps & { surveyId?: string }> = ({ surveyId }) => {
  const survey = useSurvey(surveyId)

  if (survey.isLoading) {
    return <Survey.Loading />
  }

  if (survey.data?.id) {
    return (
      <MetadataProvider>
        <Survey.Main survey={survey.data} />
      </MetadataProvider>
    )
  }

  return <Survey.NotFound />
}

export default Respondent
