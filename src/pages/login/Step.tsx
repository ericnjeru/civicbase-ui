import { ReactElement } from 'react'
import tw from 'twin.macro'
import Card from 'components/Card'

const Step = ({ children, isActive, ...props }: { children: ReactElement; isActive: boolean }) => {
  return (
    <Card
      css={[
        tw`absolute top-32 w-full h-auto bottom-0 rounded-none border-0`,
        tw`flex flex-col transform translate-y-full pt-12`,
        isActive && tw`transition-all ease-in-out duration-700 transform -translate-y-0 opacity-100`,
        !isActive && tw`transition-all ease-in-out duration-700 transform translate-y-full opacity-0`,
      ]}
      style={{ borderTopLeftRadius: isActive ? 56 : 0 }}
      {...props}
    >
      {children}
    </Card>
  )
}

export default Step
