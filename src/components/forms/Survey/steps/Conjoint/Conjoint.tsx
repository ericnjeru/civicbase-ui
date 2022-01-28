import { useFormContext, useFieldArray } from 'react-hook-form'
import tw from 'twin.macro'
import AddButton from 'components/AddButton'
import Input from 'components/Form/Input'
import Label from 'components/Form/Label'
import FieldErrorMessage from 'components/Form/FieldErrorMessage'
import QuestionContent from './QuestionContent'
import { IconButton } from 'components/Button'
import { AiOutlineClose } from 'react-icons/ai'

const Conjoint = () => {
  const methods = useFormContext()
  const {
    register,
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
              <IconButton onClick={() => remove(index)} css={tw`hover:bg-red-50`}>
                <AiOutlineClose />
              </IconButton>
            </div>
            <Input {...register(`conjoint.${index}.statement`)} key={field.id} />
            <FieldErrorMessage css={tw`ml-2`} name={`conjoint.${index}.statement`} errors={errors} />

            <div css={tw`mt-8`}>
              <QuestionContent questionIndex={index} />
            </div>
          </>
        ))}
      </div>
      <AddButton css={[tw`h-12`, fields.length > 0 && tw`mt-16`]} onClick={() => append({ statement: '' })}>
        + Add Question
      </AddButton>
    </>
  )
}

export default Conjoint
