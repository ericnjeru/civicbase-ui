import tw from 'twin.macro'
import { useFieldArray, useFormContext } from 'react-hook-form'
import AddButton from 'components/AddButton'
import { IconButton } from 'components/Button'
import { AiOutlineClose } from 'react-icons/ai'
import Input from 'components/Form/Input'

const QuestionContent = ({ questionIndex, isPublished }: { questionIndex: number; isPublished: boolean }) => {
  const { register } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    name: `likert.${questionIndex}.items`,
  })

  return (
    <div css={tw`grid grid-cols-1 gap-4`}>
      <div>
        {fields.map((item, index) => (
          <div key={item.id} css={tw`my-2 flex`}>
            <div css={tw`flex-1`}>
              <Input {...register(`likert.${questionIndex}.items.${index}.description`)} />
            </div>

            {!isPublished && (
              <IconButton onClick={() => remove(index)} css={tw`hover:bg-red-50`}>
                <AiOutlineClose />
              </IconButton>
            )}
          </div>
        ))}

        <AddButton css={tw`h-10 text-base`} onClick={() => append({ description: '' })} disabled={isPublished}>
          + Add Item
        </AddButton>
      </div>
    </div>
  )
}

export default QuestionContent
