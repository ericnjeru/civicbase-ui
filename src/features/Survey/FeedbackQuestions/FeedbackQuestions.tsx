import { useFormContext } from 'react-hook-form'

import TextArea from 'components/Form/TextArea'
import { Headline } from 'components/Typography'
import tw from 'twin.macro'

type Questions = {
  question: string
}

const FeedbackQuestions = ({ questions }: { questions: Questions[] }) => {
  const { register } = useFormContext()

  return (
    <div css={tw`flex flex-col w-full`}>
      {questions.map((item, index) => (
        <div key={item.question} css={tw`mb-6`}>
          <Headline>{item.question}</Headline>

          <TextArea {...register(`feedback.questions.${index}.answer`)} css={tw`mt-4`} />
        </div>
      ))}
    </div>
  )
}

export default FeedbackQuestions
