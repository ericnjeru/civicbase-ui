import tw from 'twin.macro'
import { Router } from '@reach/router'
import Dashboard from 'pages/dashboard'
import Analytics from 'pages/analytics/Analytics'
import CreateSurvey from 'pages/survey/Create'
import FAQs from 'pages/faqs'
import { AUTHENTICATED_ROUTES } from './routes'
import NotFound from 'pages/404'

const AuthenticatedApp = () => {
  return (
    <div css={tw`overflow-y-auto h-full`}>
      <div css={tw`container mx-auto mt-24 mb-12 h-full`}>
        <Router>
          <Dashboard path={AUTHENTICATED_ROUTES.DASHBOARD} />
          <Analytics path={AUTHENTICATED_ROUTES.ANALYTICS} />
          <CreateSurvey path={AUTHENTICATED_ROUTES.CREATE_SURVEY} />
          <FAQs path={AUTHENTICATED_ROUTES.FAQ} />
          <NotFound default />
        </Router>
      </div>
    </div>
  )
}

export default AuthenticatedApp
