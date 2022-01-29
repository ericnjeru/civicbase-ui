import tw from 'twin.macro'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import Input from 'components/Form/Input'
import Label from 'components/Form/Label'
import Dropdown from 'components/Dropdown'
import FieldErrorMessage from 'components/Form/FieldErrorMessage'
import { Methods } from '../../../../../../types/survey'
import Switch from 'components/Switch'

const Setup = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext()

  const isActive = useWatch({ name: 'setup.feedback.active' })
  const methods: Methods[] = ['Quadratic', 'Linear', 'Conjoint']

  return (
    <>
      <Label>Topic *</Label>
      <Input {...register('setup.topic', { required: true })} error={!!errors.setup?.topic} />
      <FieldErrorMessage css={tw`ml-2`} name="setup.topic" errors={errors} />

      <div css={tw`grid grid-cols-2 gap-8 my-4`}>
        <div>
          <Label>Survey Method</Label>
          <Controller
            name="setup.method"
            control={control}
            render={({ field }) => <Dropdown values={methods} {...field} />}
          />
        </div>

        <div>
          <Label>Total number of credits *</Label>
          <Input
            {...register('setup.credits', { valueAsNumber: true, required: true })}
            type="number"
            step={1}
            error={!!errors.setup?.credits}
          />
          <FieldErrorMessage css={tw`ml-2`} name="setup.credits" errors={errors} />
        </div>

        <Controller
          name="setup.feedback.active"
          control={control}
          render={({ field }) => <Switch {...field}>Enable respondent feedback?</Switch>}
        />
      </div>

      {isActive && (
        <>
          <Label>Feedback question</Label>
          <Input {...register('setup.feedback.question')} error={!!errors.setup?.feedbackQuestion} />
          <FieldErrorMessage css={tw`ml-2`} name="setup.feedback.question" errors={errors} />
        </>
      )}
    </>
  )
}

export default Setup
