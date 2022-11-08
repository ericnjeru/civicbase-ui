import { getSurveys } from 'services/survey'
import { assign, createMachine } from 'xstate'

import { SurveyDashboard } from '../../types/survey'

interface Context {
  surveys: SurveyDashboard[]
}

type Events = { type: 'FETCH' } | { type: 'RETRY' }

const dashboardMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QFdZgE4DoCWEA2YAxAGICiAKgMIASA2gAwC6ioADgPazYAu27AdixAAPRAEYALADZM9AMxSJAVjkAmCQHZ6WuQBoQAT0Sq5EzGKVj5kgJwTJ9KaoC+z-agyY87AIYRs-FCEEAJgOPwAbuwA1mEeWN5+AVAIAVEAxj68AgyMuUIcXNmCSIbiUmKyEnYaqgAc9HV1cho2+qII0jJy2s2NVkrSNq7uaAm+-oGEGOjsWKx4WQBmcwC2mPFeE8mpkeyZxbn5pYU8fCWgHV2YPRp9dQND+kYIYmJyVTX1jc13w24gTZLHzYPDIdBEABKFEhAE1jmxOGcBEIOpIZPJFCp1FodM9xHVVJhVNYxBoWo56IMNK4Afx2BA4EJNrgCAUkcVUYglDIlEpanUbGITCpLDz8QgTGYpHIGlZ6KolAqJBIRoCxlskoF2UVzlyEHJ3jcbGoxIK7A4pBKxBVPppvk0Wv9Rp5YMh0uk4PAThy9aUOooZBJ6FZDdV7MGrWVXnUlOYbCGSVIbFpVJI6mqgSCwRCdciLiJEBJVNbhZgbIqWlJBSTBXVVQD4nnOf7EABaKMvEzlioPKxSHnkwkZ2lAA */
  createMachine(
    {
      schema: {
        context: {} as Context,
        events: {} as Events,
        services: {} as {
          fetchSurveys: {
            data: SurveyDashboard[]
          }
        },
      },
      context: { surveys: [] },
      tsTypes: {} as import('./dashboardMachine.typegen').Typegen0,
      id: 'dashboard',
      initial: 'idle',
      states: {
        idle: {
          on: {
            FETCH: {
              target: 'loading',
            },
          },
        },
        loading: {
          invoke: {
            src: 'fetchSurveys',
            onDone: [
              {
                actions: 'assignDataToContext',
                target: 'idle',
              },
            ],
            onError: [
              {
                target: 'failure',
              },
            ],
          },
        },

        failure: {
          on: {
            RETRY: {
              target: 'loading',
            },
          },
        },
      },
    },
    {
      actions: {
        assignDataToContext: assign((_ctx, event) => {
          const surveys = event.data.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())

          return { surveys }
        }),
      },
      services: {
        fetchSurveys: async () => {
          return getSurveys()
        },
      },
    },
  )

export default dashboardMachine
