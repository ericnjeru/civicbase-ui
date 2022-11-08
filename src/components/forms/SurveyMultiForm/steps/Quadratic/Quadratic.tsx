import { useFormContext, useFieldArray, Controller } from 'react-hook-form'
import { AiOutlineClose } from 'react-icons/ai'

import AddButton from 'components/AddButton'
import { IconButton } from 'components/Button'
import FieldErrorMessage from 'components/Form/FieldErrorMessage'
import Label from 'components/Form/Label'
import TextEditor from 'components/TextEditor'
import { EditorState } from 'draft-js'
import tw from 'twin.macro'

const Quadratic = ({ isPublished }: { isPublished: boolean }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    name: 'quadratic',
  })

  return (
    <>
      <FieldErrorMessage name={`quadratic`} errors={errors} />

      <div css={tw`grid grid-cols-1 gap-4`}>
        {fields.map((field, index) => (
          <div key={field.id} css={tw`my-4`}>
            <div css={tw`flex justify-between`}>
              <Label>Question {index + 1} *</Label>
              {!isPublished && (
                <IconButton onClick={() => remove(index)} css={tw`hover:bg-red-50`}>
                  <AiOutlineClose />
                </IconButton>
              )}
            </div>
            <Controller
              name={`quadratic.${index}.statement`}
              control={control}
              render={({ field }) => (
                <TextEditor
                  onChange={field.onChange}
                  value={field.value}
                  readOnly={isPublished}
                  error={errors.quadratic && !!errors.quadratic[index]}
                  enableImage
                />
              )}
            />
            <FieldErrorMessage name={`quadratic.${index}`} errors={errors} />
          </div>
        ))}
        <AddButton
          css={tw`h-12`}
          onClick={() => append({ statement: EditorState.createEmpty() })}
          disabled={isPublished}
        >
          + Add Question
        </AddButton>
      </div>
    </>
  )
}

export default Quadratic
