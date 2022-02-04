import { useFormContext, useFieldArray, Controller } from 'react-hook-form'
import tw from 'twin.macro'
import { EditorState } from 'draft-js'
import AddButton from 'components/AddButton'
import Label from 'components/Form/Label'
import FieldErrorMessage from 'components/Form/FieldErrorMessage'
import QuestionContent from './QuestionContent'
import { IconButton } from 'components/Button'
import { AiOutlineClose } from 'react-icons/ai'
import TextEditor from 'components/TextEditor'

const Conjoint = ({ isPublished }: { isPublished: boolean }) => {
  const methods = useFormContext()
  const {
    control,
    formState: { errors },
  } = methods

  const { fields, append, remove } = useFieldArray({
    name: 'conjoint',
  })

  return (
    <>
      <div css={tw`grid grid-cols-1 gap-4`}>
        {fields.map((field, index) => (
          <>
            <div css={tw`flex justify-between`}>
              <Label>Question {index + 1}</Label>
              {!isPublished && (
                <IconButton onClick={() => remove(index)} css={tw`hover:bg-red-50`}>
                  <AiOutlineClose />
                </IconButton>
              )}
            </div>
            <Controller
              name={`conjoint.${index}.statement`}
              control={control}
              render={({ field }) => <TextEditor {...field} readOnly={isPublished} />}
            />
            <FieldErrorMessage css={tw`ml-2`} name={`conjoint.${index}.statement`} errors={errors} />

            <div css={tw`mt-8`}>
              <QuestionContent questionIndex={index} isPublished={isPublished} />
            </div>
          </>
        ))}
      </div>
      <AddButton
        css={[tw`h-12`, fields.length > 0 && tw`mt-16`]}
        onClick={() => append({ statement: EditorState.createEmpty() })}
        disabled={isPublished}
      >
        + Add Question
      </AddButton>
    </>
  )
}

export default Conjoint
