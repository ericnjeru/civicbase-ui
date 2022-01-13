import { useToast } from 'contexts/toast'
import tw from 'twin.macro'

const Toast = () => {
  const { toast } = useToast()

  if (!toast || toast.text === undefined) {
    return null
  }

  return (
    <div css={tw`bg-black bg-opacity-70 text-white p-3 rounded-xl absolute bottom-4 left-2/4`}>
      <div>{toast?.text}</div>
    </div>
  )
}

export default Toast
