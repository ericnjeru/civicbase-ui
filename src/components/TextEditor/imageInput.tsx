import React from 'react'
import tw from 'twin.macro'
import { IconButton } from 'components/Button'
import Input from 'components/Form/Input'
import { AiOutlineClose } from 'react-icons/ai'
import { TiTick } from 'react-icons/ti'

interface ImageInputProps {
  setShowURLInput: (value: boolean) => void
  handleImage: (url: string) => void
}
const ImageInput = ({ setShowURLInput, handleImage }: ImageInputProps) => {
  const [url, setUrl] = React.useState('')
  console.log(url)
  return (
    <div css={tw`flex mb-2 mr-1`}>
      <Input placeholder="https://imageurl.com/yourimage.jpg" onChange={(e) => setUrl(e.target.value)} />
      <IconButton onClick={() => handleImage(url)}>
        <TiTick size={18} />
      </IconButton>
      <IconButton onClick={() => setShowURLInput(false)}>
        <AiOutlineClose size={18} />
      </IconButton>
    </div>
  )
}

export default ImageInput
