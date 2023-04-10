import { useFormContext } from 'react-hook-form'

import FieldErrorMessage from 'components/Form/FieldErrorMessage'
import Input from 'components/Form/Input'
import Label from 'components/Form/Label'
import tw from 'twin.macro'

const Costs = () => {
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext()
  const questions = watch('quadratic')

  return (
    <>
      <FieldErrorMessage name={`costs`} errors={errors} />

      <div css={tw`grid grid-cols-1 gap-4`}>
        {questions?.map((question: any, index: number) => (
          <div key={`${question.id}-${index}`} css={tw`my-4`}>
            <Label>Question {index + 1} Cost *</Label>
            <Input
              {...register(`costs.${index}`, { required: true, valueAsNumber: true })}
              type="number"
              step={1}
              defaultValue={10}
              error={errors.observations && !!errors.observations[index]}
            />
            <FieldErrorMessage name={`costs.${index}`} errors={errors} />
          </div>
        ))}
      </div>
    </>
  )
}

export default Costs
