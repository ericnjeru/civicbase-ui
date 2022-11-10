import { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'

import tw from 'twin.macro'

import Input from '.'

const CustomInput = ({
  name,
  children,
  index,
  ...props
}: { children?: ReactNode; index: string; name: string } & any) => {
  const { register } = useFormContext()

  return (
    <div css={tw`mt-1 relative rounded-md shadow-sm`}>
      <div css={tw`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none`}>
        <span css={tw`text-brand2 sm:text-sm`}> {index} </span>
      </div>

      <Input {...register(name)} css={[tw`pl-10`, children && tw`pr-9`]} {...props} />

      {children && <div css={tw`absolute inset-y-0 right-0 flex items-center mr-1`}>{children}</div>}
    </div>
  )
}

export default CustomInput
