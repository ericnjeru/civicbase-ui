import tw from 'twin.macro'
import { useFormContext, Controller, useWatch } from 'react-hook-form'
import Label from 'components/Form/Label'
import Dropdown from 'components/Dropdown'
import Input from 'components/Form/Input'
import FieldErrorMessage from 'components/Form/FieldErrorMessage'
import { surveyMethods } from 'utilities/constants'

const Language = () => {
  const languages = ['Agree/Disagree', 'Favor/Opose', 'Aprove/Reject', 'Aye/Nay', 'Custom']
  const tokens = ['Credits', 'Coins', 'Tokens', 'Custom']
  const method = useWatch({ name: 'setup.method' })

  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useFormContext()

  const isCustomJargon = watch('language.jargon') === 'Custom'
  const isCustomToken = watch('language.token') === 'Custom'

  if (method !== surveyMethods.Quadratic) {
    return null
  }

  return (
    <div css={tw`grid grid-cols-1 gap-6`}>
      <div>
        <Label>Preferred Language *</Label>
        <Controller
          name="language.jargon"
          control={control}
          render={({ field }) => (
            <Dropdown
              options={languages}
              value={field.value}
              onChange={field.onChange}
              placeholder="Select preferred language"
              error={errors?.language?.jargon}
            />
          )}
        />
        <FieldErrorMessage name="language.jargon" errors={errors} />
      </div>

      {isCustomJargon && (
        <div css={tw`grid grid-cols-2 gap-8`}>
          <div>
            <Label>Thumbs Up *</Label>
            <Input
              {...register('language.thumbsUp', { required: isCustomJargon })}
              error={!!errors.language?.thumbsUp}
            />
            <FieldErrorMessage name="language.thumbsUp" errors={errors} />
          </div>

          <div>
            <Label>Thumbs Down *</Label>
            <Input
              {...register('language.thumbsDown', { required: isCustomJargon })}
              error={!!errors.language?.thumbsDown}
            />
            <FieldErrorMessage name="language.thumbsDown" errors={errors} />
          </div>
        </div>
      )}

      <div>
        <Label>Preferred Token *</Label>
        <Controller
          name="language.token"
          control={control}
          render={({ field }) => (
            <Dropdown
              options={tokens}
              value={field.value}
              onChange={field.onChange}
              placeholder="Select preferred token"
              error={errors?.language?.token}
            />
          )}
        />
        <FieldErrorMessage name="language.token" errors={errors} />
      </div>

      {isCustomToken && (
        <div>
          <Label>Custom Credit Language *</Label>
          <Input
            {...register('language.customToken', { required: isCustomToken })}
            error={!!errors.language?.customToken}
          />
          <FieldErrorMessage name="language.customToken" errors={errors} />
        </div>
      )}
    </div>
  )
}

export default Language
