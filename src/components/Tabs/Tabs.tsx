import { ReactNode, useCallback, useState, useEffect } from 'react'

import usePrevious from 'hooks/use-previos'

import TabContext from './TabContext'

const Tabs = ({
  initial,
  children,
  onChange,
}: {
  initial: string
  children: ReactNode
  onChange?: (previous: string | undefined, active: string) => void
}) => {
  const [active, setActive] = useState(() => initial)
  const prevActive = usePrevious(active)

  useEffect(() => {
    if (onChange) {
      onChange(prevActive, active)
    }
  }, [active, prevActive, onChange])

  const handleActiveTab = useCallback((id: string) => {
    setActive(id)
  }, [])

  return <TabContext.Provider value={{ active, onChange: handleActiveTab }}>{children}</TabContext.Provider>
}

export default Tabs
