// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true
  internalEvents: {
    'done.invoke.dashboard.loading:invocation[0]': {
      type: 'done.invoke.dashboard.loading:invocation[0]'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'xstate.init': { type: 'xstate.init' }
  }
  invokeSrcNameMap: {
    fetchSurveys: 'done.invoke.dashboard.loading:invocation[0]'
  }
  missingImplementations: {
    actions: never
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    assignDataToContext: 'done.invoke.dashboard.loading:invocation[0]'
  }
  eventsCausingServices: {
    fetchSurveys: 'FETCH' | 'RETRY'
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates: 'failure' | 'idle' | 'loading'
  tags: never
}
