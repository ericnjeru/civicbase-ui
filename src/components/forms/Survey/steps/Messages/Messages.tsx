import { Controller, useFormContext } from 'react-hook-form'
import tw from 'twin.macro'
import TextEditor from 'components/TextEditor'
import Label from 'components/Form/Label'

const Messages = () => {
  const { control } = useFormContext()

  return (
    <div css={tw`grid grid-cols-1 gap-8`}>
      <div>
        <Label>Wecome Message</Label>
        <Controller name="message.welcome" control={control} render={({ field }) => <TextEditor {...field} />} />
      </div>

      <div>
        <Label>Completion Message</Label>
        <Controller name="message.completion" control={control} render={({ field }) => <TextEditor {...field} />} />
      </div>
    </div>
  )
}

export default Messages
