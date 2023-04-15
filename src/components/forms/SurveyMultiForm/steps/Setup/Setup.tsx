import { useEffect } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

import Dropdown from 'components/Dropdown'
import FieldErrorMessage from 'components/Form/FieldErrorMessage'
import Input from 'components/Form/Input'
import Label from 'components/Form/Label'
import { Diamond, Radius } from 'components/Methods'
import Switch from 'components/Switch'
import tw from 'twin.macro'
import { surveyMethods } from 'utilities/constants'

import { Methods } from '../../../../../../types/survey-base'
import FeedbackQuestions from './FeedbackQuestions'

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
  const methods: Methods[] = ['Quadratic', 'Likert', 'Conjoint', 'Priced']

  useEffect(() => {
    if (method !== (method === surveyMethods.Quadratic || method === surveyMethods.Priced)) {
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
                  placeholder="Select a survey method"
                  options={methods}
                  error={errors?.setup?.method}
                  modified={isEditing && fieldState.isDirty}
                  value={field.value}
                  onChange={field.onChange}
                />
              )
            }}
          />
          <FieldErrorMessage name="setup.method" errors={errors} />
        </div>

        <div>
          {(method === surveyMethods.Quadratic || method === surveyMethods.Priced) && (
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

        {(method === surveyMethods.Quadratic || method === surveyMethods.Priced) && credits === 100 && (
          <div css={tw`col-span-2`}>
            <div css={tw`grid grid-cols-2 gap-8 my-4`}>
              {method === surveyMethods.Quadratic && (
                <Diamond onSelect={() => setValue('setup.methodPreference', 'diamond')} />
              )}
              <Radius onSelect={() => setValue('setup.methodPreference', 'radius')} />
            </div>
          </div>
        )}

        <div css={tw`col-span-2`}>
          <Controller
            name="setup.feedback.active"
            control={control}
            render={({ field }) => (
              <Switch value={field.value} onChange={field.onChange}>
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
