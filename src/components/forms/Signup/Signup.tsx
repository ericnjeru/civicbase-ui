import tw from 'twin.macro'
import { useForm } from 'react-hook-form'
import Input from 'components/Form/Input'
import Label from 'components/Form/Label'
import { PrimaryButton } from 'components/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { validationSchema } from './validation'
import FieldErrorMessage from 'components/Form/FieldErrorMessage'
import Checkbox from 'components/Form/Checkbox'
import { useEffect } from 'react'

interface SignupFormValues {
  name: string
  email: string
  password: string
  TC: boolean
}

const Signup = ({ toggle }: { toggle: boolean }) => {
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
    if (toggle && reset) {
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
      <div css={tw`flex flex-col justify-between h-full pb-6`}>
        <div css={tw`grid grid-cols-1 gap-8`}>
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input {...register('name')} error={!!errors.name} />
            <FieldErrorMessage css={tw`ml-2`} name="name" errors={errors} />
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input {...register('email')} error={!!errors.email} />
            <FieldErrorMessage css={tw`ml-2`} name="email" errors={errors} />
          </div>

          <div>
            <Label htmlFor="password">Password *</Label>
            <Input {...register('password')} error={!!errors.password} type="password" />
            <FieldErrorMessage css={tw`ml-2`} name="password" errors={errors} />
          </div>

          <div>
            <Label css={tw`inline-flex space-x-4 items-center`}>
              <Checkbox {...register('TC')} style={{ minWidth: '1.25rem' }} />
              <span css={[!!errors.TC && tw`text-error-600 text-opacity-75`]}>
                By proceeding I agree to Civicbase&apos;s Terms of Use and my personal information being handled in
                accordance with Civicbase&apos;s Privacy Policy.
              </span>
            </Label>
          </div>

          <PrimaryButton type="submit" css={tw`mt-8`}>
            Sign Up
          </PrimaryButton>
        </div>
      </div>
    </form>
  )
}

export default Signup
