import Input from 'components/Form/Input'
import Typography from 'components/Typography'
import { KeyboardEvent, useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import tw from 'twin.macro'

const EditText = ({ name, placeholder = '' }: { name: string; placeholder?: string }) => {
  const [editMode, setEditMode] = useState(false)
  const { register, control, setFocus } = useFormContext()
  const value = useWatch({
    control,
    name,
    defaultValue: placeholder,
  })

  useEffect(() => {
    if (editMode) {
      setFocus(name)
    }
  }, [editMode, name, setFocus])

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setEditMode(false)
    }
  }

  const handleEditMode = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      setEditMode(true)
    }
  }

  const handleClick = () => {
    setEditMode(true)
  }

  if (editMode) {
    return (
      <Input
        {...register(name)}
        onBlur={() => setEditMode(false)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
    )
  } else {
    return (
      <div
        css={tw`p-2 hover:bg-gray-100 rounded-md`}
        onClick={handleClick}
        onKeyDown={handleEditMode}
        role="button"
        tabIndex={0}
      >
        <Typography css={[(value === placeholder || !value) && tw`text-gray-400 hover:text-gray-700`]}>
          {value || placeholder}
        </Typography>
      </div>
    )
  }
}

export default EditText
