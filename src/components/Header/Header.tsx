import tw from 'twin.macro'
import { BiCog } from 'react-icons/bi'
import { FiSun, FiMoon } from 'react-icons/fi'
import { PrimaryButton, SecondaryButton, IconButton } from 'components/Button'
import { Subtitle } from 'components/Typography'
import Menu from './Menu'
import { useTheme } from 'contexts/theme'

const Header = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (setTheme) {
      if (theme === 'dark') {
        setTheme('light')
      } else {
        setTheme('dark')
      }
    }
  }

  return (
    <div css={tw`flex items-center w-full`}>
      <div css={tw`w-full overflow-hidden flex items-center justify-between p-6`}>
        <Subtitle css={tw`m-0`}>QVSR2</Subtitle>
        <div css={tw`flex`}>
          <div css={tw`flex mobile:hidden`}>
            <PrimaryButton>Blog</PrimaryButton>
            <PrimaryButton css={tw`mx-2`}>FAQ</PrimaryButton>
            <PrimaryButton css={tw`mr-2`}>About</PrimaryButton>
            <SecondaryButton css={tw`mr-2`}>Admin</SecondaryButton>
          </div>

          <IconButton onClick={() => toggleTheme()}>
            {theme === 'dark' ? <FiSun size={22} /> : <FiMoon size={22} />}
          </IconButton>
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
