import tw from 'twin.macro'
import { useFormContext, useFieldArray, Controller } from 'react-hook-form'
import { AiOutlineClose } from 'react-icons/ai'
import { EditorState } from 'draft-js'
import AddButton from 'components/AddButton'
import Label from 'components/Form/Label'
import FieldErrorMessage from 'components/Form/FieldErrorMessage'
import TextEditor from 'components/TextEditor'
import { IconButton } from 'components/Button'

const Questions = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    name: 'quadratic',
  })

  return (
    <div css={tw`grid grid-cols-1 gap-4`}>
      {fields.map((field, index) => (
        <div key={field.id} css={tw`my-4`}>
          <div css={tw`flex justify-between`}>
            <Label>Question {index + 1}</Label>
            <IconButton onClick={() => remove(index)} css={tw`hover:bg-red-50`}>
              <AiOutlineClose />
            </IconButton>
          </div>
          <Controller
            name={`quadratic.${index}.statement`}
            control={control}
            render={({ field }) => <TextEditor {...field} />}
          />
          <FieldErrorMessage css={tw`ml-2`} name={`quadratic.${index}.statement`} errors={errors} />
        </div>
      ))}
      <AddButton css={tw`h-12`} onClick={() => append({ statement: EditorState.createEmpty() })}>
        + Add Question
      </AddButton>
    </div>
  )
}

export default Questions
