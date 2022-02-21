import { useEffect } from 'react'
import tw from 'twin.macro'
import { useForm } from 'react-hook-form'
import Input from 'components/Form/Input'
import Label from 'components/Form/Label'
import Typography from 'components/Typography'
import { PrimaryButton } from 'components/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { validationSchema } from './validation'
import FieldErrorMessage from 'components/Form/FieldErrorMessage'
import { useAuth } from 'contexts/auth'
import useAsync from 'hooks/use-async'
import Spinner from 'components/Spinner'

interface LoginFormValues {
  email: string
}

const ForgotPassword = ({ next }: { next: () => void }) => {
  const { reset } = useAuth()
  const { run, error, isLoading, setError, isSuccess } = useAsync()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(validationSchema),
  })

  useEffect(() => {
    if (isSuccess) {
      next()
    }
  }, [isSuccess, next])

  useEffect(() => {
    return () => {
      resetForm()
      setError(null)
    }
  }, [resetForm, setError])

  return (
    <form
      onSubmit={handleSubmit((values) => {
        reset && run(reset({ ...values }))
      })}
      css={tw`h-full`}
    >
      <div css={tw`flex flex-col justify-between pb-6 h-full`}>
        <div css={tw`grid grid-cols-1 gap-8`}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input {...register('email')} error={!!errors.email} disabled={isLoading} />
            <FieldErrorMessage name="email" errors={errors} />
          </div>

          {error && <Typography css={tw`text-center text-error-600`}>{error.message}</Typography>}

          <PrimaryButton css={tw`mt-8 flex justify-center items-center space-x-4`} type="submit" disabled={isLoading}>
            {isLoading && <Spinner variant="light" />}
            <div>Reset Password</div>
          </PrimaryButton>
        </div>
      </div>
    </form>
  )
}

export default ForgotPassword
