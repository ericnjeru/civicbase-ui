export const AUTHENTICATED_ROUTES = {
  DASHBOARD: '/',
  SURVEY_STEP_FORM: '/surveyForm',
  ANALYTICS: '/analytics/:surveyId',
  SURVEY: '/survey/:surveyId',
  FAQ: '/FAQ',
}

export const UNAUTHENTICATED_ROUTES = {
  LOGIN: '/',
  SURVEY: '/survey/:surveyId',
  FAQ: '/FAQ',
}
