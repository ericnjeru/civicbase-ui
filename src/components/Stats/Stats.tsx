import Card from 'components/Card'
import { ReactNode } from 'react'
import tw from 'twin.macro'

const Stats = ({ children }: { children: ReactNode[] }) => {
  return (
    <Card css={tw`p-0`}>
      <div css={tw`grid grid-flow-col divide-x`}>{children}</div>
    </Card>
  )
}

export default Stats
