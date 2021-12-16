import tw from 'twin.macro'
import { useFormContext } from 'react-hook-form'
import { PrimaryButton } from 'components/Button'

const SubmitSurvey = () => {
  const {
    formState: { isValid, isDirty },
  } = useFormContext()

  console.log('isValid', isValid)

  return (
    <div>
      <PrimaryButton css={tw`w-full`} type="submit" disabled={!isValid || !isDirty}>
        Create Survey
      </PrimaryButton>
    </div>
  )
}

export default SubmitSurvey
