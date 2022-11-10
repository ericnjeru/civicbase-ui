import { memo, ReactNode, useContext } from 'react'

import tw from 'twin.macro'

import TabContext from './TabContext'

const TabPanel = memo(({ value, children }: { value: string; children: ReactNode }) => {
  const { active } = useContext(TabContext)

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      css={active === value ? tw`block` : tw`hidden`}
    >
      {children}
    </div>
  )
})

TabPanel.displayName = 'TabPanel'

export default TabPanel
