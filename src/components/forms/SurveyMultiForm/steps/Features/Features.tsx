import { useFormContext, Controller, useWatch } from 'react-hook-form'

import FieldErrorMessage from 'components/Form/FieldErrorMessage'
import Input from 'components/Form/Input'
import Label from 'components/Form/Label'
import Switch from 'components/Switch'
import tw from 'twin.macro'

const Features = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext()

  const multipleAnswerFromSameSource = useWatch({ name: 'features.multipleAnswerFromSameSource' })
  return (
    <div>
      <div css={tw`grid grid-cols-1 gap-4`}>
        {/* <Controller
          name="features.qualtrics"
          control={control}
          render={({ field }) => (
            <Switch value={field.value} onChange={field.onChange}>
              Qualtrics Integration
            </Switch>
          )}
        />

        <Controller
          name="features.userIdentification"
          control={control}
          render={({ field }) => (
            <Switch value={field.value} onChange={field.onChange}>
              Require respondent Identification
            </Switch>
          )}
        />

        <Controller
          name="features.randomQuestions"
          control={control}
          render={({ field }) => (
            <Switch value={field.value} onChange={field.onChange}>
              Random questions apresentation
            </Switch>
          )}
        /> */}

        <Controller
          name="features.multipleAnswerFromSameSource"
          control={control}
          render={({ field }) => (
            <Switch value={field.value} onChange={field.onChange}>
              Respondent can answer survey more than once
            </Switch>
          )}
        />
        {multipleAnswerFromSameSource && (
          <div>
            <Label>Total number of Observations *</Label>
            <Input
              {...register('features.totalObservations', { required: true, valueAsNumber: true })}
              type="number"
              step={1}
              defaultValue={10}
              error={!!errors.observations?.totalObservations}
            />
            <FieldErrorMessage name="features.totalObservations" errors={errors} />
          </div>
        )}

        {/* <Switch>Activate A/B test</Switch> */}
      </div>
    </div>
  )
}

export default Features
