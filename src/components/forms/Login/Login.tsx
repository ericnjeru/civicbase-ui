import { useEffect, useState } from 'react'
import tw, { theme } from 'twin.macro'
import { useForm, FormProvider } from 'react-hook-form'
import Label from 'components/Form/Label'
import Typography from 'components/Typography'
import { IconButton, PrimaryButton } from 'components/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { validationSchema } from './validation'
import FieldErrorMessage from 'components/Form/FieldErrorMessage'
import { useAuth } from 'contexts/auth'
import useAsync from 'hooks/use-async'
import { PrimaryTextButton } from 'components/Button'
import Spinner from 'components/Spinner'
import { CustomInput } from 'components/Form/Input'
import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import { BsEyeSlash, BsEye } from 'react-icons/bs'

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

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((values) => {
          login && run(login({ ...values }))
        })}
        css={tw`h-full`}
      >
        <div css={tw`flex flex-col justify-between pb-6 h-full`}>
          <div css={tw`grid grid-cols-1 gap-4`}>
            <div>
              <Label htmlFor="email">Email</Label>

              <CustomInput
                name="email"
                error={!!methods.formState.errors.email}
                disabled={isLoading}
                index={<AiOutlineMail color={theme`colors.gray.400`} />}
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
              >
                <IconButton onClick={() => setShowPassword(!showPassword)} css={tw`hover:bg-transparent`}>
                  {showPassword ? <BsEyeSlash /> : <BsEye />}
                </IconButton>
              </CustomInput>

              <FieldErrorMessage name="password" errors={methods.formState.errors} />

              <PrimaryTextButton css={tw`mt-4 focus:ring-0`} onClick={handleForgotPassword}>
                Forgot password?
              </PrimaryTextButton>
            </div>

            {error && <Typography css={tw`text-center text-error-600`}>{error.message}</Typography>}

            <PrimaryButton
              css={tw`mt-8 flex justify-center items-center space-x-4 h-12`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading && <Spinner variant="light" />}
              <div>LOGIN</div>
            </PrimaryButton>
          </div>
          <Typography css={tw`text-center hover:(cursor-pointer)`} onClick={next}>
            Do not have account yet? SIGN UP!
          </Typography>
        </div>
      </form>
    </FormProvider>
  )
}

export default Login
