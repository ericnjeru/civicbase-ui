import tw from 'twin.macro'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import Input from 'components/Form/Input'
import Label from 'components/Form/Label'
import Dropdown from 'components/Dropdown'
import FieldErrorMessage from 'components/Form/FieldErrorMessage'
import { Methods } from '../../../../../../types/survey-base'
import Switch from 'components/Switch'
import FeedbackQuestions from './FeedbackQuestions'
import { surveyMethods } from 'utilities/constants'

const Setup = ({ isEditing }: { isEditing: boolean }) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext()

  const isActive = useWatch({ name: 'setup.feedback.active' })
  const method = useWatch({ name: 'setup.method' })
  const methods: Methods[] = ['Quadratic', 'Likert', 'Conjoint']

  return (
    <>
      <Label>Topic *</Label>
      <Input {...register('setup.topic', { required: true })} error={!!errors.setup?.topic} />
      <FieldErrorMessage css={tw`ml-2`} name="setup.topic" errors={errors} />

      <div css={tw`grid grid-cols-2 gap-8 my-4`}>
        <div>
          <Label>Survey method</Label>
          <Controller
            name="setup.method"
            control={control}
            render={({ field }) => (
              <Dropdown disabled={isEditing} placeholder="Select survey method" values={methods} {...field} />
            )}
          />
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
              <FieldErrorMessage css={tw`ml-2`} name="setup.credits" errors={errors} />
            </>
          )}
        </div>

        <Controller
          name="setup.feedback.active"
          control={control}
          render={({ field }) => <Switch {...field}>Enable respondent feedback?</Switch>}
        />
      </div>

      {isActive && <FeedbackQuestions />}
    </>
  )
}

export default Setup
