import tw from 'twin.macro'
import { useFormContext } from 'react-hook-form'
import { PrimaryButton } from 'components/Button'
import Spinner from 'components/Spinner'

const SubmitSurvey = ({ isLoading, isEditing = false }: { isLoading: boolean; isEditing?: boolean }) => {
  const {
    formState: { isValid, isDirty },
  } = useFormContext()

  return (
    <div>
      <PrimaryButton
        css={tw`w-full flex justify-center items-center`}
        type="submit"
        disabled={!isValid || !isDirty || isLoading}
      >
        {isLoading && <Spinner variant="light" css={tw`mr-4`} />}
        {isEditing ? 'Edit' : 'Create'} Survey
      </PrimaryButton>
    </div>
  )
}

export default SubmitSurvey
