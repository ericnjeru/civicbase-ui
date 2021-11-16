import { ReactNode, useCallback, useState } from 'react'
import TabContext from './TabContext'

const Tabs = ({ initial, children }: { initial: string; children: ReactNode }) => {
  const [active, setActive] = useState(() => initial)

  const handleActiveTab = useCallback((id: string) => {
    setActive(id)
  }, [])

  return <TabContext.Provider value={{ active, onChange: handleActiveTab }}>{children}</TabContext.Provider>
}

export default Tabs
