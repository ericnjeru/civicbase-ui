import tw from 'twin.macro'
import { BiCog } from 'react-icons/bi'
// import { FiSun, FiMoon } from 'react-icons/fi'
import { PrimaryButton, SecondaryButton, IconButton, PrimaryTextButton } from 'components/Button'
import { Subtitle } from 'components/Typography'
import Menu from './Menu'
// import { useTheme } from 'contexts/theme'
import { useAuth } from 'contexts/auth'

const Header = () => {
  const { user } = useAuth()
  // const { theme, setTheme } = useTheme()

  // const toggleTheme = () => {
  //   if (setTheme) {
  //     if (theme === 'dark') {
  //       setTheme('light')
  //     } else {
  //       setTheme('dark')
  //     }
  //   }
  // }
  if (!user) {
    return null
  }

  return (
    <div css={tw`flex items-center w-full fixed bg-primary z-50`}>
      <div css={tw`w-full overflow-hidden flex items-center justify-between px-6 py-4`}>
        <PrimaryTextButton as="a" href="/" css={tw`focus:(outline-none ring-0)`}>
          <Subtitle css={tw`m-0`}>Civicbase</Subtitle>
        </PrimaryTextButton>
        <div css={tw`flex space-x-4`}>
          <div css={tw`flex mobile:hidden`}>
            <PrimaryButton>Blog</PrimaryButton>
            <PrimaryButton css={tw`mx-2`}>FAQ</PrimaryButton>
            <PrimaryButton css={tw`mr-2`}>About</PrimaryButton>
            <SecondaryButton css={tw`mr-2`}>Admin</SecondaryButton>
          </div>

          {/* <IconButton onClick={() => toggleTheme()}>
            {theme === 'dark' ? <FiSun size={22} /> : <FiMoon size={22} />}
          </IconButton> */}

          <Menu>
            <IconButton>
              <BiCog size={28} />
            </IconButton>
          </Menu>
        </div>
      </div>
    </div>
  )
}

export default Header
