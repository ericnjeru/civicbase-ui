import { createContext, useContext } from 'react'

import { useSelector } from '@xstate/react'
import { dashboardMachine } from 'machines'
import { InterpreterFrom } from 'xstate'

const dashboardContext = createContext<InterpreterFrom<typeof dashboardMachine> | null>(null)

export function useDashboard() {
  const context = useContext(dashboardContext)
  if (!context) {
    throw new Error(`useDashboard must be called inside a DashboardProvider`)
  }
  return context
}
export const DashboardProvider = dashboardContext.Provider

export const useSurveys = () => {
  return useSelector(useDashboard(), (state) => state.context.surveys)
}
