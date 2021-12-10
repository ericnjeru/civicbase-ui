import tw, { theme } from 'twin.macro'
import { BsArrowLeft } from 'react-icons/bs'
import { IconButton } from 'components/Button'
import { Title } from 'components/Typography'

const Header = ({
  isActive,
  handleBack,
  children,
}: {
  isActive: boolean
  handleBack?: () => void
  children: string
}) => {
  return (
    <div
      css={[
        tw`flex justify-between items-center opacity-0 `,
        isActive && tw`transition-all ease-in-out duration-700 opacity-100`,
        !isActive && tw`hidden`,
        handleBack && tw`mx-2`,
      ]}
    >
      {handleBack && (
        <IconButton onClick={handleBack}>
          <BsArrowLeft size={28} color={theme`colors.white`} />
        </IconButton>
      )}
      <div css={tw`w-full`}>
        <Title css={tw`text-white m-0`}>{children}</Title>
      </div>
    </div>
  )
}

export default Header
