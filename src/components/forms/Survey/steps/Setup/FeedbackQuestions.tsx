import { useFieldArray, useFormContext } from 'react-hook-form'
import tw from 'twin.macro'
import { AiOutlineClose } from 'react-icons/ai'
import AddButton from 'components/AddButton'
import { IconButton } from 'components/Button'
import Input from 'components/Form/Input'

const FeedbackQuestions = () => {
  const { register } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    name: 'setup.feedback.questions',
  })

  return (
    <div css={tw`mt-8`}>
      {fields.map((item, index) => (
        <div key={item.id} css={tw`my-2 flex`}>
          <div css={tw`flex-1`}>
            <Input
              {...register(`setup.feedback.questions.${index}.question`)}
              placeholder="Please input the question asking for the respondent's feedback"
            />
          </div>

          <IconButton onClick={() => remove(index)} css={tw`hover:bg-red-50`}>
            <AiOutlineClose />
          </IconButton>
        </div>
      ))}
      <AddButton css={tw`h-12`} onClick={() => append({ question: '' })}>
        + Add feedback question
      </AddButton>
    </div>
  )
}

export default FeedbackQuestions
