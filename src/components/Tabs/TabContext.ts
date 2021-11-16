import { createContext } from 'react'

export interface TabContextType {
  active?: string
  onChange: (id: string) => void
}

const TabContext = createContext<TabContextType>({
  active: undefined,
  onChange: () => {},
})

export default TabContext
