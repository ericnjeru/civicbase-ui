import { Router } from '@reach/router'
import Login from 'pages/login'
import Respondent from 'pages/survey/Respondent'
import NotFound from 'pages/404'
import { UNAUTHENTICATED_ROUTES } from './routes'

const UnauthenticatedApp = () => {
  return (
    <Router>
      <Login path={UNAUTHENTICATED_ROUTES.LOGIN} />
      <Respondent path={UNAUTHENTICATED_ROUTES.SURVEY} />
      <NotFound default />
    </Router>
  )
}

export default UnauthenticatedApp
