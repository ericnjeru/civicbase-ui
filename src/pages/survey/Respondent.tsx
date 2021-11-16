import DynamicBar from 'components/DynamicBar'
import { useState } from 'react'
import tw from 'twin.macro'

const Respondent = () => {
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
