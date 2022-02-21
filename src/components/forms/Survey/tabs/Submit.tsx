import tw from 'twin.macro'
import { useFormContext } from 'react-hook-form'
import { PrimaryButton } from 'components/Button'
import Spinner from 'components/Spinner'
import useValidation from '../use-validation'

const SubmitSurvey = ({ isLoading, isEditing = false }: { isLoading: boolean; isEditing?: boolean }) => {
  const { isSetup, isLanguage, isConjoint, isLikert, isQuadratic } = useValidation()
  const {
    formState: { isDirty },
  } = useFormContext()

  return (
    <div>
      <PrimaryButton
        css={tw`w-full flex justify-center items-center`}
        type="submit"
        disabled={!isDirty || isLoading || !isSetup || !isLanguage || !isConjoint || !isLikert || !isQuadratic}
      >
        {isLoading && <Spinner variant="light" css={tw`mr-4`} />}
        {isEditing ? 'Edit' : 'Create'} Survey
      </PrimaryButton>
    </div>
  )
}

export default SubmitSurvey
