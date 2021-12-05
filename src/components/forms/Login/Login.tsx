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

interface LoginFormValues {
  email: string
  password: string
}

const Login = ({ handleToggle, toggle }: { handleToggle: () => void; toggle: boolean }) => {
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
    if (!toggle && reset) {
      reset()
    }
  }, [toggle, reset])

  return (
    <form
      onSubmit={handleSubmit((values) => {
        console.log({ values })
      })}
      css={tw`h-full`}
    >
      <div css={tw`flex flex-col justify-between pb-6 h-full`}>
        <div css={tw`grid grid-cols-1 gap-8`}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input {...register('email')} error={!!errors.email} />
            <FieldErrorMessage css={tw`ml-2`} name="email" errors={errors} />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input {...register('password')} error={!!errors.password} type="password" />
            <FieldErrorMessage css={tw`ml-2`} name="password" errors={errors} />
          </div>

          <PrimaryButton css={tw`mt-8`} type="submit">
            Login
          </PrimaryButton>
        </div>
        <Typography css={tw`text-center hover:(cursor-pointer text-brand )`} onClick={handleToggle}>
          Do not have account yet? Sign up!
        </Typography>
      </div>
    </form>
  )
}

export default Login
