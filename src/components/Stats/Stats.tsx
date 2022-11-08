import { ReactNode } from 'react'

import Card from 'components/Card'
import tw from 'twin.macro'

const Stats = ({ children }: { children: ReactNode[] }) => {
  return (
    <Card css={tw`p-0 border-transparent`}>
      <div css={tw`grid grid-flow-col divide-x dark:(divide-gray-700 hover:divide-gray-800)`}>{children}</div>
    </Card>
  )
}

export default Stats
