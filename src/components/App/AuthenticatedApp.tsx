import { Router } from '@reach/router'
import Dashboard from 'pages/dashboard'
import Analytics from 'pages/analytics/Analytics'
import CreateSurvey from 'pages/survey/Create'
import EditSurvey from 'pages/survey/Edit'
import FAQs from 'pages/faqs'
import { AUTHENTICATED_ROUTES } from './routes'
import NotFound from 'pages/404'
import { SurveysProvider } from 'contexts/surveys'
import ResearcherSurvey from 'pages/survey/Respondent'
import tw from 'twin.macro'

const AuthenticatedApp = () => {
  return (
    <div css={tw`container mx-auto pt-36 pb-12 h-full`}>
      <SurveysProvider>
        <Router css={tw`h-full`}>
          <Dashboard path={AUTHENTICATED_ROUTES.DASHBOARD} />
          <Analytics path={AUTHENTICATED_ROUTES.ANALYTICS} />
          <CreateSurvey path={AUTHENTICATED_ROUTES.CREATE_SURVEY} />
          <EditSurvey path={AUTHENTICATED_ROUTES.EDIT_SURVEY} />
          <ResearcherSurvey path={AUTHENTICATED_ROUTES.SURVEY} preview={true} />
          <FAQs path={AUTHENTICATED_ROUTES.FAQ} />
          <NotFound default />
        </Router>
      </SurveysProvider>
    </div>
  )
}

export default AuthenticatedApp
