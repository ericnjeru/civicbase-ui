import { FC } from 'react'
import { RouteComponentProps } from '@reach/router'
import Survey from 'components/forms/Survey'
import { Survey as SurveyType } from '../../../types/survey.d'

const Edit: FC<RouteComponentProps> = ({ location }) => {
  return <Survey survey={location?.state as SurveyType} />
}

export default Edit
