import tw from 'twin.macro'
import { useFieldArray, useFormContext } from 'react-hook-form'
import AddButton from 'components/AddButton'
import { IconButton } from 'components/Button'
import { AiOutlineClose } from 'react-icons/ai'
import { CustomInput } from 'components/Form/Input'
import Label from 'components/Form/Label'
import FieldErrorMessage from 'components/Form/FieldErrorMessage'

const QuestionContent = ({ questionIndex, isPublished }: { questionIndex: number; isPublished: boolean }) => {
  const {
    // register,
    formState: { errors },
  } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    name: `likert.${questionIndex}.items`,
  })

  return (
    <div css={tw`grid grid-cols-1 gap-4`}>
      <div>
        {fields.map((item, index) => (
          <div key={item.id} css={tw`my-2 flex`}>
            <div css={tw`flex-1`}>
              <Label>Item {index + 1} *</Label>

              <CustomInput
                name={`likert.${questionIndex}.items.${index}.description`}
                placeholder="Please input the question asking for the respondent's feedback"
                error={
                  errors.likert &&
                  errors.likert[questionIndex] &&
                  errors.likert[questionIndex].items[index] &&
                  !!errors.likert[questionIndex].items[index].description
                }
                index={`I${index}`}
              >
                <>
                  {!isPublished && (
                    <IconButton onClick={() => remove(index)} css={tw`hover:bg-red-50`}>
                      <AiOutlineClose />
                    </IconButton>
                  )}
                </>
              </CustomInput>

              <FieldErrorMessage name={`likert.${questionIndex}.items.${index}.description`} errors={errors} />
            </div>
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
