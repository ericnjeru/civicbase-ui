import { useState, FC } from 'react'
import tw from 'twin.macro'
import { RouteComponentProps } from '@reach/router'
import DynamicBar from 'components/DynamicBar'

const Respondent: FC<RouteComponentProps> = () => {
  const [credits, setCredits] = useState(50)

  const handleCredits = () => {
    const x = Math.floor(Math.random() * (100 - 1 + 1) + 1)
    setCredits(x)
  }

  console.log(handleCredits)
  return (
    <div css={tw`container mx-auto`}>
      <DynamicBar total={credits} />
    </div>
  )
}

export default Respondent
