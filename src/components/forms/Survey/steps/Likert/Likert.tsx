import tw from 'twin.macro'
import { useFormContext, useFieldArray, Controller } from 'react-hook-form'
import { AiOutlineClose } from 'react-icons/ai'
import { EditorState } from 'draft-js'
import AddButton from 'components/AddButton'
import Label from 'components/Form/Label'
import FieldErrorMessage from 'components/Form/FieldErrorMessage'
import TextEditor from 'components/TextEditor'
import { IconButton } from 'components/Button'
import QuestionContent from '../Likert/QuestionContent'

const Likert = ({ isPublished }: { isPublished: boolean }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    name: 'likert',
  })

  return (
    <>
      <FieldErrorMessage name={`likert`} errors={errors} />
      <div css={tw`grid grid-cols-1 gap-4`}>
        {fields.map((field, index) => (
          <div key={field.id}>
            <div css={tw`flex justify-between`}>
              <Label>Question {index + 1}</Label>
              {!isPublished && (
                <IconButton onClick={() => remove(index)} css={tw`hover:bg-red-50`}>
                  <AiOutlineClose />
                </IconButton>
              )}
            </div>
            <Controller
              name={`likert.${index}.statement`}
              control={control}
              render={({ field }) => (
                <TextEditor
                  onChange={field.onChange}
                  value={field.value}
                  readOnly={isPublished}
                  error={errors.likert && !!errors.likert[index]?.statement}
                  enableImage
                />
              )}
            />
            <FieldErrorMessage name={`likert.${index}.statement`} errors={errors} />

            <div css={tw`mt-8`}>
              <QuestionContent questionIndex={index} isPublished={isPublished} />
            </div>
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

export default Likert
