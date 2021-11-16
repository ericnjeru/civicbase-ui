import AddButton from 'components/AddButton'
import Input from 'components/Form/Input'
import Label from 'components/Form/Label'
import { useState } from 'react'
import tw from 'twin.macro'

const Questions = () => {
  const [questions, setQuestions] = useState<string[]>([''])

  return (
    <div css={tw`grid grid-cols-1 gap-4`}>
      {questions.map((q: string, i: number) => (
        <>
          <Label>Question {i + 1}</Label>
          <Input value={q} />
        </>
      ))}

      <AddButton css={tw`h-12`} onClick={() => setQuestions([...questions, ''])}>
        + Add Question
      </AddButton>
    </div>
  )
}

export default Questions
