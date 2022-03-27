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
import { PrimaryTextButton } from 'components/Button'
import Spinner from 'components/Spinner'

interface LoginFormValues {
  email: string
  password: string
}

const Login = ({ next, handleForgotPassword }: { next: () => void; handleForgotPassword: () => void }) => {
  const { login } = useAuth()
  const { run, error, isLoading, setError } = useAsync()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(validationSchema),
  })

  useEffect(() => {
    return () => {
      reset()
      setError(null)
    }
  }, [reset, setError])

  return (
    <form
      onSubmit={handleSubmit((values) => {
        login && run(login({ ...values }))
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

          <div>
            <Label htmlFor="password">Password</Label>
            <Input {...register('password')} error={!!errors.password} type="password" disabled={isLoading} />
            <FieldErrorMessage name="password" errors={errors} />
          </div>

          {error && <Typography css={tw`text-center text-error-600`}>{error.message}</Typography>}

          <PrimaryTextButton css={tw`focus:ring-0`} onClick={handleForgotPassword}>
            Forgot password?
          </PrimaryTextButton>

          <PrimaryButton css={tw`mt-8 flex justify-center items-center space-x-4`} type="submit" disabled={isLoading}>
            {isLoading && <Spinner variant="light" />}
            <div>Login</div>
          </PrimaryButton>
        </div>
        <Typography css={tw`text-center hover:(cursor-pointer)`} onClick={next}>
          Do not have account yet? Sign up!
        </Typography>
      </div>
    </form>
  )
}

export default Login
