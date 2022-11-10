import { useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { AiOutlineMail } from 'react-icons/ai'

import { zodResolver } from '@hookform/resolvers/zod'
import { PrimaryButton } from 'components/Button'
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
}

const ForgotPassword = ({ next }: { next: () => void }) => {
  const { reset } = useAuth()
  const { run, error, isLoading, setError, isSuccess } = useAsync()

  const methods = useForm<LoginFormValues>({
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
      methods.reset()
      setError(null)
    }
  }, [methods, setError])

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((values) => {
          reset && run(reset({ ...values }))
        })}
        css={tw`h-full`}
      >
        <div css={tw`flex flex-col justify-between pb-6 h-full`}>
          <div css={tw`grid grid-cols-1 gap-4 mobile:gap-1`}>
            <div>
              <Label htmlFor="email">Email *</Label>

              <CustomInput
                name="email"
                error={!!methods.formState.errors.email}
                disabled={isLoading}
                index={<AiOutlineMail color={theme`colors.gray.400`} />}
              />

              <FieldErrorMessage name="email" errors={methods.formState.errors} />
            </div>

            {error && <Typography css={tw`text-center text-error-600`}>{error.message}</Typography>}

            <PrimaryButton
              css={tw`mt-8 flex justify-center items-center space-x-4 h-12 mobile:mt-2`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading && <Spinner variant="light" />}
              <div>RESET PASSWORD</div>
            </PrimaryButton>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default ForgotPassword
