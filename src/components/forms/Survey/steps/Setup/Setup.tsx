import tw from 'twin.macro'
import { useEffect } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import Input from 'components/Form/Input'
import Label from 'components/Form/Label'
import Dropdown from 'components/Dropdown'
import FieldErrorMessage from 'components/Form/FieldErrorMessage'
import { Methods } from '../../../../../../types/survey-base'
import Switch from 'components/Switch'
import FeedbackQuestions from './FeedbackQuestions'
import { surveyMethods } from 'utilities/constants'
import { Diamond, Radius } from 'components/Methods'

const Setup = ({ isEditing }: { isEditing: boolean }) => {
  const {
    setValue,
    register,
    control,
    formState: { errors },
  } = useFormContext()

  const isActive = useWatch({ name: 'setup.feedback.active' })
  const method = useWatch({ name: 'setup.method' })
  const credits = useWatch({ name: 'setup.credits' })
  const methods: Methods[] = ['Quadratic', 'Likert', 'Conjoint']

  useEffect(() => {
    if (method !== surveyMethods.Quadratic) {
      setValue('language', null)
    }
  }, [method, setValue])

  return (
    <>
      <Label>Topic *</Label>
      <Input {...register('setup.topic', { required: true })} error={!!errors.setup?.topic} />
      <FieldErrorMessage name="setup.topic" errors={errors} />

      <div css={tw`grid grid-cols-2 gap-8 my-4`}>
        <div>
          <Label>Survey Method *</Label>
          <Controller
            name="setup.method"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <Dropdown
                  disabled={isEditing}
                  placeholder="Select survey method"
                  options={methods}
                  error={errors?.setup?.method}
                  modified={isEditing && fieldState.isDirty}
                  {...field}
                />
              )
            }}
          />
          <FieldErrorMessage name="setup.method" errors={errors} />
        </div>

        <div>
          {method === surveyMethods.Quadratic && (
            <>
              <Label>Total number of credits *</Label>
              <Input
                {...register('setup.credits', { valueAsNumber: true })}
                type="number"
                step={1}
                error={!!errors.setup?.credits}
              />
              <FieldErrorMessage name="setup.credits" errors={errors} />
            </>
          )}
        </div>

        {method === surveyMethods.Quadratic && credits === 100 && (
          <div css={tw`col-span-2`}>
            <div css={tw`grid grid-cols-2 gap-8 my-4`}>
              <Diamond onSelect={() => setValue('setup.methodPreference', 'diamond')} />
              <Radius onSelect={() => setValue('setup.methodPreference', 'radius')} />
            </div>
          </div>
        )}

        <div css={tw`col-span-2`}>
          <Controller
            name="setup.feedback.active"
            control={control}
            render={({ field }) => (
              <Switch {...field}>
                <div css={tw`flex flex-col h-11`}>
                  Enable respondent feedback?
                  <FieldErrorMessage name="setup.feedback" errors={errors} css={tw`ml-0`} />
                </div>
              </Switch>
            )}
          />
        </div>
      </div>

      {isActive && <FeedbackQuestions />}
    </>
  )
}

export default Setup
