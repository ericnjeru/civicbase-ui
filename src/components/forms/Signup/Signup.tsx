import tw from 'twin.macro'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Input from 'components/Form/Input'
import Label from 'components/Form/Label'
import { PrimaryButton } from 'components/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { validationSchema } from './validation'
import FieldErrorMessage from 'components/Form/FieldErrorMessage'
import Checkbox from 'components/Form/Checkbox'
import { useAuth } from 'contexts/auth'
import useAsync from 'hooks/use-async'
import Spinner from 'components/Spinner'

interface SignupFormValues {
  name: string
  email: string
  password: string
  TC: boolean
}

const Signup = ({ shouldReset, next }: { shouldReset: boolean; next: () => void }) => {
  const { signup } = useAuth()
  const { run, isSuccess, isLoading } = useAsync()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupFormValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      TC: false,
    },
    resolver: zodResolver(validationSchema),
  })

  useEffect(() => {
    if (isSuccess) {
      next()
    }
  }, [isSuccess])

  useEffect(() => {
    if (shouldReset && reset) {
      reset()
    }
  }, [shouldReset, reset])

  return (
    <form
      onSubmit={handleSubmit((values) => {
        signup && run(signup({ ...values }))
      })}
      css={tw`h-full`}
    >
      <div css={tw`flex flex-col justify-between h-full pb-6`}>
        <div css={tw`grid grid-cols-1 gap-8`}>
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input {...register('name')} error={!!errors.name} disabled={isLoading} />
            <FieldErrorMessage css={tw`ml-2`} name="name" errors={errors} />
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input {...register('email')} error={!!errors.email} disabled={isLoading} />
            <FieldErrorMessage css={tw`ml-2`} name="email" errors={errors} />
          </div>

          <div>
            <Label htmlFor="password">Password *</Label>
            <Input {...register('password')} error={!!errors.password} type="password" disabled={isLoading} />
            <FieldErrorMessage css={tw`ml-2`} name="password" errors={errors} />
          </div>

          <div>
            <Label css={tw`inline-flex space-x-4 items-center`}>
              <Checkbox {...register('TC')} style={{ minWidth: '1.25rem' }} disabled={isLoading} />
              <span css={[!!errors.TC && tw`text-error-600 text-opacity-75`]}>
                By proceeding I agree to Civicbase&apos;s Terms of Use and my personal information being handled in
                accordance with Civicbase&apos;s Privacy Policy.
              </span>
            </Label>
          </div>

          <PrimaryButton css={tw`mt-8 flex justify-center items-center space-x-4`} type="submit" disabled={isLoading}>
            {isLoading && <Spinner variant="light" />}
            <div>Sign Up</div>
          </PrimaryButton>
        </div>
      </div>
    </form>
  )
}

export default Signup
