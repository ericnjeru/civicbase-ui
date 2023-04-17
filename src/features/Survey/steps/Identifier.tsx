import { useState } from 'react'

import { PrimaryButton } from 'components/Button'
import Input from 'components/Form/Input'
import Label from 'components/Form/Label'
import { Hint } from 'components/Typography'
import tw from 'twin.macro'

const Identifier = ({
  handleNext,
  setIdentifier,
  identifier,
}: {
  handleNext: () => void
  setIdentifier: (value: string) => void
  identifier: string
}) => {
  const [isError, setError] = useState<boolean>(false)
  const onNext = () => {
    if (!identifier) {
      setError(true)
      return
    }
    handleNext()
  }

  return (
    <div css={tw`w-full flex flex-col items-center justify-center mt-8`}>
      <Label>To start the survey enter your identity*</Label>
      <Input
        name="identifier"
        type="text"
        required={true}
        css={tw`w-96`}
        onChange={(e) => setIdentifier(e.target.value)}
        onBlur={() => setError(!identifier)}
      />
      <Hint hidden={!isError} css={tw`text-error-600 text-opacity-75 mt-1 ml-2 dark:text-error-300`}>
        Identity is required
      </Hint>
      <div css={tw`w-full flex justify-center mt-8`}>
        <PrimaryButton onClick={onNext}>Next</PrimaryButton>
      </div>
    </div>
  )
}

export default Identifier
