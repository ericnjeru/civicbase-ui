import { ReactNode } from 'react'

import Typography, { Subtitle } from 'components/Typography'
import tw from 'twin.macro'

const Stat = ({ title, metric, children }: { title: string; metric?: number | string; children?: ReactNode }) => {
  return (
    <div css={tw`p-4`}>
      <Typography>{title}</Typography>
      <div css={tw`flex justify-between mt-3`}>
        <Subtitle css={tw`text-brand2 mb-0`}>{metric}</Subtitle>
        {children}
      </div>
    </div>
  )
}

export default Stat
