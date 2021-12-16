import { Controller, useFormContext } from 'react-hook-form'
import { EditorState } from 'draft-js'
import TextEditor from 'components/TextEditor'

const CompletionMessage = () => {
  const { control } = useFormContext()

  return (
    <Controller
      name="message.completion"
      control={control}
      render={({ field }) => <TextEditor {...field} value={field.value || EditorState.createEmpty()} />}
    />
  )
}

export default CompletionMessage
