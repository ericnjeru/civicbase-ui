import { FC } from 'react'
import { RouteComponentProps } from '@reach/router'
import Survey from 'components/forms/Survey'
import { EditSurvey } from '../../../types/survey'

const Edit: FC<RouteComponentProps> = ({ location }) => {
  return <Survey survey={location?.state as EditSurvey} />
}

export default Edit
