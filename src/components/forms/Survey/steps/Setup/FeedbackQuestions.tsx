import { useFieldArray, useFormContext } from 'react-hook-form'
import tw from 'twin.macro'
import { AiOutlineClose } from 'react-icons/ai'
import AddButton from 'components/AddButton'
import { IconButton } from 'components/Button'
import FieldErrorMessage from 'components/Form/FieldErrorMessage'
import Label from 'components/Form/Label'
import { CustomInput } from 'components/Form/Input'

const FeedbackQuestions = () => {
  const {
    formState: { errors },
  } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    name: 'setup.feedback.questions',
  })

  return (
    <div css={tw`mt-8`}>
      {fields.map((item, index) => {
        const questionError = errors.setup?.feedback?.questions

        return (
          <div key={item.id} css={tw`my-2 flex`}>
            <div css={tw`flex-1`}>
              <Label>Feedback Question {index + 1} *</Label>

              <CustomInput
                name={`setup.feedback.questions.${index}.question`}
                placeholder="Please input the question asking for the respondent's feedback"
                error={questionError && questionError[index]?.question}
                index={`F${index}`}
              >
                <IconButton onClick={() => remove(index)} css={tw`hover:bg-red-50`}>
                  <AiOutlineClose />
                </IconButton>
              </CustomInput>

              <FieldErrorMessage name={`setup.feedback.questions.${index}.question`} errors={errors} />
            </div>
          </div>
        )
      })}
      <AddButton css={tw`h-12 mt-2`} onClick={() => append({ question: '' })}>
        + Add feedback question
      </AddButton>
    </div>
  )
}

export default FeedbackQuestions
