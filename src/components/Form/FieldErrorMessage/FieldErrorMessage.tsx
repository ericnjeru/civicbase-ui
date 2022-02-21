import { ErrorMessage } from '@hookform/error-message'
import { FieldErrors } from 'react-hook-form'
import { Hint } from 'components/Typography'
import tw from 'twin.macro'

const FieldErrorMessage = ({ errors, name, ...props }: { errors: FieldErrors; name: string }) => (
  <ErrorMessage
    name={name}
    errors={errors}
    render={({ message }) => (
      <Hint css={tw`text-error-600 text-opacity-75 mt-1 ml-2`} {...props}>
        {message}
      </Hint>
    )}
  />
)

export default FieldErrorMessage
