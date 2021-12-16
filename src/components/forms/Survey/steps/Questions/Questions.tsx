import tw from 'twin.macro'
import { useFormContext, useFieldArray } from 'react-hook-form'
import AddButton from 'components/AddButton'
import Input from 'components/Form/Input'
import Label from 'components/Form/Label'
import FieldErrorMessage from 'components/Form/FieldErrorMessage'

const Questions = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const { fields, append } = useFieldArray({
    name: 'questions',
  })

  return (
    <div css={tw`grid grid-cols-1 gap-4`}>
      {fields.map((field, index) => (
        <>
          <Label>Question {index + 1}</Label>
          <Input {...register(`questions.${index}.statement`)} key={field.id} />
          <FieldErrorMessage css={tw`ml-2`} name={`questions.${index}.statement`} errors={errors} />
        </>
      ))}
      <AddButton css={tw`h-12`} onClick={() => append({ statement: '' })}>
        + Add Question
      </AddButton>
    </div>
  )
}

export default Questions
