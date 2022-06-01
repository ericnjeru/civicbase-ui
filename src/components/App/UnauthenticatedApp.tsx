import { Router } from '@reach/router'
import tw from 'twin.macro'
import Login from 'pages/login'
import Respondent from 'pages/survey/Respondent'
import NotFound from 'pages/404'
import { UNAUTHENTICATED_ROUTES } from './routes'

const UnauthenticatedApp = () => {
  return (
    <div css={tw`container mx-auto h-full`}>
      <Router css={tw`h-full`}>
        <Login path={UNAUTHENTICATED_ROUTES.LOGIN} />
        <Respondent path={UNAUTHENTICATED_ROUTES.SURVEY} />
        <NotFound default />
      </Router>
    </div>
  )
}

export default UnauthenticatedApp
