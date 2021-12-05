import tw from 'twin.macro'
import { Router } from '@reach/router'
import Login from 'pages/login'
import Respondent from 'pages/survey/Respondent'
import NotFound from 'pages/404'
import { UNAUTHENTICATED_ROUTES } from './routes'
import RouterWrapper from './RouterWrapper'

const UnauthenticatedApp = () => {
  return (
    <div css={tw`overflow-y-auto h-full`}>
      <div css={tw`container mx-auto pt-24 pb-12 h-full`}>
        <Router component={RouterWrapper}>
          <Login path={UNAUTHENTICATED_ROUTES.LOGIN} />
          <Respondent path={UNAUTHENTICATED_ROUTES.SURVEY} />
          <NotFound default />
        </Router>
      </div>
    </div>
  )
}

export default UnauthenticatedApp
