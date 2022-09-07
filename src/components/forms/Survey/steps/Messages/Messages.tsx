import { Controller, useFormContext } from 'react-hook-form'
import tw from 'twin.macro'
import TextEditor from 'components/TextEditor'
import Label from 'components/Form/Label'

const Messages = () => {
  const { control } = useFormContext()

  return (
    <div css={tw`grid grid-cols-1 gap-8`}>
      <div>
        <Label>Welcome Message</Label>
        <Controller
          name="message.welcome"
          control={control}
          render={({ field }) => <TextEditor onChange={field.onChange} value={field.value} size={150} enableImage />}
        />
      </div>

      <div>
        <Label>Completion Message</Label>
        <Controller
          name="message.completion"
          control={control}
          render={({ field }) => <TextEditor onChange={field.onChange} value={field.value} size={150} enableImage />}
        />
      </div>
    </div>
  )
}

export default Messages
