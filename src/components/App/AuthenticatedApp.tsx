import { Router } from '@reach/router'
import { useInterpret } from '@xstate/react'
import { DashboardProvider } from 'contexts/dashboard'
import { dashboardMachine } from 'machines'
import NotFound from 'pages/404'
import Analytics from 'pages/analytics/Analytics'
import Dashboard from 'pages/dashboard'
import ResearcherSurvey from 'pages/survey/Respondent'
import SurveyForm from 'pages/survey/SurveyForm'
import tw from 'twin.macro'

import { AUTHENTICATED_ROUTES } from './routes'

const AuthenticatedApp = () => {
  const dashboardService = useInterpret(dashboardMachine)

  return (
    <div css={tw`container mx-auto pt-36 pb-12 h-full`}>
      <DashboardProvider value={dashboardService}>
        <Router css={tw`h-full`}>
          <Dashboard path={AUTHENTICATED_ROUTES.DASHBOARD} />
          <Analytics path={AUTHENTICATED_ROUTES.ANALYTICS} />
          <SurveyForm path={AUTHENTICATED_ROUTES.SURVEY_STEP_FORM} />
          <ResearcherSurvey path={AUTHENTICATED_ROUTES.SURVEY} preview={true} />
          <NotFound default />
        </Router>
      </DashboardProvider>
    </div>
  )
}

export default AuthenticatedApp
