export const AUTHENTICATED_ROUTES = {
  DASHBOARD: '/',
  CREATE_SURVEY: '/create-survey',
  ANALYTICS: '/analytics/:surveyId',
  SURVEY_DETAILS: '/survey-details/:surveyId',
  FAQ: '/FAQ',
}

export const UNAUTHENTICATED_ROUTES = {
  LOGIN: '/',
  SURVEY: '/survey/:surveyId',
  FAQ: '/FAQ',
}
