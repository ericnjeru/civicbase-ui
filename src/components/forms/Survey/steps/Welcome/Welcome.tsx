import { Controller, useFormContext } from 'react-hook-form'
import TextEditor from 'components/TextEditor'

const WelcomeMessage = () => {
  const { control } = useFormContext()

  return <Controller name="message.welcome" control={control} render={({ field }) => <TextEditor {...field} />} />
}

export default WelcomeMessage
