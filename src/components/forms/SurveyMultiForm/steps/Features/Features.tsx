import { useFormContext, Controller, useWatch } from 'react-hook-form'

import Card from 'components/Card'
import FieldErrorMessage from 'components/Form/FieldErrorMessage'
import Input from 'components/Form/Input'
import Label from 'components/Form/Label'
import Switch from 'components/Switch'
import tw from 'twin.macro'

const Features = () => {
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext()
  const multipleAnswerFromSameSource = useWatch({ name: 'features.multipleAnswerFromSameSource' })
  const totalObservations = useWatch({ name: 'features.totalObservations' })
  const questions = watch('priced')
  let method = watch('setup.method')
  if (method) {
    method = method.toLowerCase()
  }
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
        {multipleAnswerFromSameSource && method === 'priced' && (
          <div>
            <div>
              <Label>Total number of Observations *</Label>
              <Input
                {...register('features.totalObservations', { required: true, valueAsNumber: true })}
                type="number"
                step={1}
                defaultValue={10}
                error={!!errors.features?.totalObservations}
              />
              <FieldErrorMessage name="features.totalObservations" errors={errors} />
            </div>
            <div css={tw`mt-10`}>
              <Label>Price structure for each observation *</Label>
            </div>
            <div css={tw`grid grid-cols-3 gap-3`}>
              {totalObservations > 0 &&
                Array(totalObservations)
                  .fill('Observation')
                  ?.map((observation: string, index: number) => (
                    <Card key={`_${index}`} css={tw`my-4`}>
                      <Label>
                        {observation} {index + 1}*
                      </Label>
                      <FieldErrorMessage name={`features.priced.${index}`} errors={errors} />
                      <div css={tw`grid grid-cols-3 gap-3`}>
                        {questions?.map((_: any, qIndex: number) => (
                          <div key={`_${index}_${qIndex}`}>
                            <p>Q {qIndex + 1}*</p>
                            <Input
                              {...register(`features.priced.${index}.${qIndex}`, {
                                required: true,
                                valueAsNumber: true,
                              })}
                              type="number"
                              step={1}
                              defaultValue={10}
                              error={errors.features && errors.features?.priced && !!errors.features?.priced[index]}
                            />
                            <FieldErrorMessage name={`features.priced.${index}.${qIndex}`} errors={errors} />
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
            </div>
          </div>
        )}

        {/* <Switch>Activate A/B test</Switch> */}
      </div>
    </div>
  )
}

export default Features
