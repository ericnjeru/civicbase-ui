import { ReactNode } from 'react'
import tw from 'twin.macro'
import { Title } from 'components/Typography'

const AddButton = ({ children, onClick, ...props }: { children: string | ReactNode; onClick: () => void }) => {
  return (
    <button
      css={[
        tw`w-full h-40 border-dashed border-2 rounded-md text-gray-500`,
        tw`flex justify-center items-center`,
        tw`hover:border-gray-600 hover:text-gray-600 focus:outline-none`,
      ]}
      onClick={onClick}
      {...props}
      type="button"
    >
      <Title css={tw`text-current m-0`}>{children}</Title>
    </button>
  )
}

export default AddButton
