import tw from 'twin.macro'
import { useFormContext, Controller } from 'react-hook-form'
import Label from 'components/Form/Label'
import Dropdown from 'components/Dropdown'
import Input from 'components/Form/Input'
import FieldErrorMessage from 'components/Form/FieldErrorMessage'

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
          render={({ field }) => <Dropdown values={languages} value={field.value} onChange={field.onChange} />}
        />
      </div>

      {isCustomJargon && (
        <div css={tw`grid grid-cols-2 gap-8`}>
          <div>
            <Label>Thumbs Up *</Label>
            <Input
              {...register('language.thumbsUp', { required: isCustomJargon })}
              error={!!errors.language?.thumbsUp}
            />
            <FieldErrorMessage css={tw`ml-2`} name="language.thumbsUp" errors={errors} />
          </div>

          <div>
            <Label>Thumbs Down *</Label>
            <Input
              {...register('language.thumbsDown', { required: isCustomJargon })}
              error={!!errors.language?.thumbsDown}
            />
            <FieldErrorMessage css={tw`ml-2`} name="language.thumbsDown" errors={errors} />
          </div>
        </div>
      )}

      <div>
        <Label>Preferred Token *</Label>
        <Controller
          name="language.token"
          control={control}
          render={({ field }) => <Dropdown values={tokens} value={field.value} onChange={field.onChange} />}
        />
      </div>

      {isCustomToken && (
        <div>
          <Label>Custom Credit Language *</Label>
          <Input
            {...register('language.customToken', { required: isCustomToken })}
            error={!!errors.language?.customToken}
          />
          <FieldErrorMessage css={tw`ml-2`} name="language.customToken" errors={errors} />
        </div>
      )}
    </div>
  )
}

export default Language
