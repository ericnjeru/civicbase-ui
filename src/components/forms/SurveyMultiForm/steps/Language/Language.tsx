import { useFormContext, Controller } from 'react-hook-form'

import Dropdown from 'components/Dropdown'
import FieldErrorMessage from 'components/Form/FieldErrorMessage'
import Input from 'components/Form/Input'
import Label from 'components/Form/Label'
import tw from 'twin.macro'

const Language = () => {
  const languages = ['Agree/Disagree', 'Favor/Opose', 'Aprove/Reject', 'Aye/Nay', 'Custom']
  const tokens = ['Credits', 'Coins', 'Tokens', 'Custom']

  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useFormContext()

  const isCustomJargon = watch('language.jargon') === 'Custom'
  const isCustomToken = watch('language.token') === 'Custom'

  return (
    <div css={tw`grid grid-cols-1 gap-6`}>
      <div>
        <Label>Preferred Language *</Label>
        <Controller
          name="language.jargon"
          control={control}
          render={({ field, fieldState }) => (
            <Dropdown
              options={languages}
              value={field.value}
              onChange={field.onChange}
              placeholder="Select preferred language"
              modified={fieldState.isDirty}
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
          render={({ field, fieldState }) => (
            <Dropdown
              options={tokens}
              value={field.value}
              onChange={field.onChange}
              placeholder="Select preferred token"
              error={errors?.language?.token}
              modified={fieldState.isDirty}
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
