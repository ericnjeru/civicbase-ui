import tw from 'twin.macro'
import { FiSun, FiMoon, FiLogOut } from 'react-icons/fi'
import { PrimaryButton, SecondaryButton, IconButton, PrimaryTextButton } from 'components/Button'
import { Subtitle } from 'components/Typography'
import { useTheme } from 'contexts/theme'
import { useAuth } from 'contexts/auth'
import Tooltip from 'components/Tooltip'
import useAsync from 'hooks/use-async'
import Spinner from 'components/Spinner'

const Header = () => {
  const { run, isLoading } = useAsync()
  const { logout, user } = useAuth()
  const { theme, setTheme } = useTheme()

  const handleLogout = () => {
    logout && run(logout())
  }

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
    <div css={tw`flex items-center w-full fixed bg-primary z-50`}>
      <div css={[tw`w-full overflow-hidden flex items-center px-6 py-4`, user ? tw`justify-between` : tw`justify-end`]}>
        {user && (
          <PrimaryTextButton as="a" href="/" css={tw`focus:(outline-none ring-0)`}>
            <Subtitle css={tw`m-0`}>Civicbase</Subtitle>
          </PrimaryTextButton>
        )}
        <div css={tw`flex space-x-4`}>
          {user && (
            <div css={tw`flex mobile:hidden`}>
              <PrimaryButton>Blog</PrimaryButton>
              <PrimaryButton css={tw`mx-2`}>FAQ</PrimaryButton>
              <PrimaryButton css={tw`mr-2`}>About</PrimaryButton>
              <SecondaryButton css={tw`mr-2`}>Admin</SecondaryButton>
            </div>
          )}

          <Tooltip label="Toggle dark mode" popperProps={{ delayShow: 200, placement: 'bottom-start' }}>
            <IconButton onClick={() => toggleTheme()}>
              {theme === 'dark' ? <FiSun size={24} /> : <FiMoon size={24} />}
            </IconButton>
          </Tooltip>

          {user && (
            <Tooltip
              label={isLoading ? 'Logging out...' : 'Logout'}
              popperProps={{ delayShow: 200, placement: 'bottom-start' }}
            >
              {isLoading ? (
                <Spinner variant={theme === 'dark' ? 'light' : 'primary'} />
              ) : (
                <IconButton onClick={handleLogout} disabled={isLoading}>
                  <FiLogOut size={24} />
                </IconButton>
              )}
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
