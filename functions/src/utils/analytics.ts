import { Analytics } from '../../../types/survey-base'

export const setAnalytics = (): Analytics => ({
  pilot: {
    current: {
      respondents: 0,
      access: 0,
    },
    previous: {
      respondents: 0,
      access: 0,
    },
    history: {
      respondents: 0,
      access: 0,
    },
  },
  published: {
    current: {
      respondents: 0,
      access: 0,
    },
    previous: {
      respondents: 0,
      access: 0,
    },
    history: {
      respondents: 0,
      access: 0,
    },
  },
})
