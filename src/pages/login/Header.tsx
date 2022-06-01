import { useState } from 'react'
import tw, { theme } from 'twin.macro'
import { BsArrowLeft } from 'react-icons/bs'
import { IconButton } from 'components/Button'
import { Title } from 'components/Typography'
// import { useTheme } from 'contexts/theme'

const Header = ({
  isActive,
  handleBack,
  children,
}: {
  isActive: boolean
  handleBack?: () => void
  children: string
}) => {
  // const { theme: currentTheme } = useTheme()
  const [hovered, setHover] = useState(false)

  return (
    <div
      css={[
        tw`flex justify-between items-center opacity-0 relative`,
        isActive && tw`transition-all ease-in-out duration-700 opacity-100`,
        !isActive && tw`hidden`,
        handleBack && tw`mx-2`,
      ]}
    >
      {handleBack && (
        <div css={tw`absolute`}>
          <IconButton
            onClick={handleBack}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            css={tw`hover:(bg-gray-300)`}
          >
            <BsArrowLeft
              size={28}
              // color={currentTheme === 'light' && hovered ? theme`colors.black` : theme`colors.white`}
              color={hovered ? theme`colors.black` : theme`colors.white`}
            />
          </IconButton>
        </div>
      )}
      <div css={tw`w-full`}>
        <Title css={tw`text-white m-0`}>{children}</Title>
      </div>
    </div>
  )
}

export default Header
