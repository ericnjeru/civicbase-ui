import tw from 'twin.macro'
import { useFormContext, useFieldArray, Controller } from 'react-hook-form'
import AddButton from 'components/AddButton'
import Label from 'components/Form/Label'
import FieldErrorMessage from 'components/Form/FieldErrorMessage'
import TextEditor from 'components/TextEditor'
import { EditorState } from 'draft-js'

const Questions = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const { fields, append } = useFieldArray({
    name: 'questions',
  })

  return (
    <div css={tw`grid grid-cols-1 gap-4`}>
      {fields.map((field, index) => (
        <div key={field.id} css={tw`my-4`}>
          <Label>Question {index + 1}</Label>
          <Controller
            name={`questions.${index}.statement`}
            control={control}
            render={({ field }) => <TextEditor {...field} />}
          />
          <FieldErrorMessage css={tw`ml-2`} name={`questions.${index}.statement`} errors={errors} />
        </div>
      ))}
      <AddButton css={tw`h-12`} onClick={() => append({ statement: EditorState.createEmpty() })}>
        + Add Question
      </AddButton>
    </div>
  )
}

export default Questions
