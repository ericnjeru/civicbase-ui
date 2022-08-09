import tw, { theme } from 'twin.macro'
import { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import Label from 'components/Form/Label'
import { IconButton, PrimaryButton } from 'components/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { validationSchema } from './validation'
import FieldErrorMessage from 'components/Form/FieldErrorMessage'
import Checkbox from 'components/Form/Checkbox'
import { useAuth } from 'contexts/auth'
import useAsync from 'hooks/use-async'
import Spinner from 'components/Spinner'
import { CustomInput } from 'components/Form/Input'
import { AiOutlineUser, AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import { BsEyeSlash, BsEye } from 'react-icons/bs'
import Typography from 'components/Typography'
interface SignupFormValues {
  name: string
  email: string
  password: string
  TC: boolean
}

const Signup = ({
  shouldReset,
  next,
  handleBack,
}: {
  shouldReset: boolean
  next: () => void
  handleBack: () => void
}) => {
  const { signup } = useAuth()
  const { run, isSuccess, isLoading } = useAsync()
  const [showPassword, setShowPassword] = useState(false)
  const methods = useForm<SignupFormValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      TC: true,
    },
    resolver: zodResolver(validationSchema),
  })

  useEffect(() => {
    if (isSuccess) {
      next()
    }
  }, [isSuccess, next])

  useEffect(() => {
    if (shouldReset && methods.reset) {
      methods.reset()
    }
  }, [shouldReset, methods])

  const password = methods.watch('password')

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((values) => {
          signup && run(signup({ ...values }))
        })}
        css={tw`h-full`}
      >
        <div css={tw`flex flex-col justify-between h-full pb-6`}>
          <div css={tw`grid grid-cols-1 gap-4 mobile:gap-1`}>
            <div>
              <Label htmlFor="name">Name *</Label>

              <CustomInput
                name="name"
                error={!!methods.formState.errors.name}
                disabled={isLoading}
                index={<AiOutlineUser color={theme`colors.gray.400`} />}
              />

              <FieldErrorMessage name="name" errors={methods.formState.errors} />
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>

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
              <Label htmlFor="password">Password *</Label>

              <CustomInput
                name="password"
                error={!!methods.formState.errors.password}
                disabled={isLoading}
                type={showPassword ? 'text' : 'password'}
                index={<RiLockPasswordLine color={theme`colors.gray.400`} />}
                autoComplete="new-password"
              >
                {password.length > 0 && (
                  <IconButton onClick={() => setShowPassword(!showPassword)} css={tw`hover:bg-transparent`}>
                    {showPassword ? <BsEyeSlash /> : <BsEye />}
                  </IconButton>
                )}
              </CustomInput>

              <FieldErrorMessage name="password" errors={methods.formState.errors} />
            </div>

            {false && (
              <div>
                <Label css={tw`inline-flex space-x-4 items-center`}>
                  <Checkbox {...methods.register('TC')} style={{ minWidth: '1.25rem' }} disabled={isLoading} />
                  <span css={[!!methods.formState.errors.TC && tw`text-error-600 text-opacity-75`]}>
                    By proceeding I agree to Civicbase&apos;s Terms of Use and my personal information being handled in
                    accordance with Civicbase&apos;s Privacy Policy.
                  </span>
                </Label>
              </div>
            )}

            <PrimaryButton
              css={tw`mt-8 flex justify-center items-center space-x-4 h-12 mobile:mt-2 `}
              type="submit"
              disabled={isLoading}
            >
              {isLoading && <Spinner variant="light" />}
              <div>SIGN UP</div>
            </PrimaryButton>
          </div>
          <Typography css={tw`text-center text-sm hover:(cursor-pointer)`} onClick={handleBack}>
            Already have an account? LOGIN
          </Typography>
        </div>
      </form>
    </FormProvider>
  )
}

export default Signup
