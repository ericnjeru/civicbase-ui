import tw from 'twin.macro'
import Switch from 'components/Switch'
import { useState } from 'react'

const Features = () => {
  const [qualtrics, setQualtrics] = useState(false)
  const [userId, setUserId] = useState(false)
  const [test, setTest] = useState(false)

  return (
    <div>
      <div css={tw`grid grid-cols-1 gap-4`}>
        <Switch enabled={qualtrics} setEnabled={setQualtrics}>
          Qualtrics Integration
        </Switch>

        <Switch enabled={userId} setEnabled={setUserId}>
          Require respondent Identification
        </Switch>

        <Switch enabled={test} setEnabled={setTest}>
          Activate A/B test
        </Switch>
      </div>
    </div>
  )
}

export default Features
