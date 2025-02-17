import { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { AiOutlineMail } from 'react-icons/ai'
import { BsEyeSlash, BsEye } from 'react-icons/bs'
import { RiLockPasswordLine } from 'react-icons/ri'

import { zodResolver } from '@hookform/resolvers/zod'
import { IconButton, PrimaryButton } from 'components/Button'
import { PrimaryTextButton } from 'components/Button'
import FieldErrorMessage from 'components/Form/FieldErrorMessage'
import { CustomInput } from 'components/Form/Input'
import Label from 'components/Form/Label'
import Spinner from 'components/Spinner'
import Typography from 'components/Typography'
import { useAuth } from 'contexts/auth'
import useAsync from 'hooks/use-async'
import tw, { theme } from 'twin.macro'

import { validationSchema } from './validation'

interface LoginFormValues {
  email: string
  password: string
}

const Login = ({ next, handleForgotPassword }: { next: () => void; handleForgotPassword: () => void }) => {
  const { login } = useAuth()
  const { run, error, isLoading, setError } = useAsync()
  const [showPassword, setShowPassword] = useState(false)
  const methods = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(validationSchema),
  })

  useEffect(() => {
    return () => {
      methods.reset()
      setError(null)
    }
  }, [methods, setError])

  const password = methods.watch('password')

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((values) => {
          login && run(login({ ...values }))
        })}
        css={tw`h-full`}
      >
        <div css={tw`flex flex-col justify-between pb-6 h-full mobile:p-0`}>
          <div css={tw`grid grid-cols-1 gap-4 mobile:gap-1`}>
            <div>
              <Label htmlFor="email">Email</Label>

              <CustomInput
                name="email"
                error={!!methods.formState.errors.email}
                disabled={isLoading}
                index={<AiOutlineMail color={theme`colors.gray.400`} />}
                autoComplete="username"
              />

              <FieldErrorMessage name="email" errors={methods.formState.errors} />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>

              <CustomInput
                name="password"
                error={!!methods.formState.errors.password}
                disabled={isLoading}
                type={showPassword ? 'text' : 'password'}
                index={<RiLockPasswordLine color={theme`colors.gray.400`} />}
                autoComplete="current-password"
              >
                {password.length > 0 && (
                  <IconButton onClick={() => setShowPassword(!showPassword)} css={tw`hover:bg-transparent`}>
                    {showPassword ? <BsEyeSlash /> : <BsEye />}
                  </IconButton>
                )}
              </CustomInput>

              <FieldErrorMessage name="password" errors={methods.formState.errors} />

              <PrimaryTextButton css={tw`mt-4 text-sm focus:ring-0`} onClick={handleForgotPassword}>
                Forgot password?
              </PrimaryTextButton>
            </div>

            {error && <Typography css={tw`text-center text-error-600`}>{error.message}</Typography>}

            <PrimaryButton
              css={tw`mt-8 flex justify-center items-center space-x-4 h-12 mobile:mt-2`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading && <Spinner variant="light" />}
              <div>LOGIN</div>
            </PrimaryButton>
          </div>
          <Typography css={tw`text-center text-sm hover:(cursor-pointer)`} onClick={next}>
            Do not have account yet? SIGN UP
          </Typography>
        </div>
      </form>
    </FormProvider>
  )
}

export default Login
