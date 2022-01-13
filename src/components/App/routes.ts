export const AUTHENTICATED_ROUTES = {
  DASHBOARD: '/',
  CREATE_SURVEY: '/create-survey',
  EDIT_SURVEY: '/edit-survey',
  ANALYTICS: '/analytics/:surveyId',
  SURVEY: '/survey/:surveyId',
  FAQ: '/FAQ',
}

export const UNAUTHENTICATED_ROUTES = {
  LOGIN: '/',
  SURVEY: '/survey/:surveyId',
  FAQ: '/FAQ',
}
