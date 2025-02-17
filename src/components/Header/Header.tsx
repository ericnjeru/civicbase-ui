import { FiSun, FiMoon, FiLogOut } from 'react-icons/fi'

import { navigate } from '@reach/router'
import { PrimaryButton, SecondaryButton, IconButton, PrimaryTextButton } from 'components/Button'
import Spinner from 'components/Spinner'
import Tooltip from 'components/Tooltip'
import { useAuth } from 'contexts/auth'
import { useTheme } from 'contexts/theme'
import useAsync from 'hooks/use-async'
import tw from 'twin.macro'

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

  const handleRedirect = () => {
    navigate('/')
  }

  return (
    <div css={tw`flex items-center w-full fixed z-50 bg-white`}>
      <div css={[tw`w-full overflow-hidden flex items-center px-6`, user ? tw`justify-between` : tw`justify-end`]}>
        {user && (
          <PrimaryTextButton onClick={handleRedirect} css={tw`focus:(outline-none ring-0)`}>
            <img src={`${process.env.PUBLIC_URL}/civicbase_logo.svg`} width={250} alt="logo" />
          </PrimaryTextButton>
        )}
        <div css={tw`flex space-x-4`}>
          {false && (
            <div css={tw`flex mobile:hidden`}>
              <PrimaryButton>Blog</PrimaryButton>
              <PrimaryButton css={tw`mx-2`}>FAQ</PrimaryButton>
              <PrimaryButton css={tw`mr-2`}>About</PrimaryButton>
              <SecondaryButton css={tw`mr-2`}>Admin</SecondaryButton>
            </div>
          )}

          {false && (
            <Tooltip label="Toggle dark mode" popperProps={{ delayShow: 200, placement: 'bottom-start' }}>
              <IconButton onClick={() => toggleTheme()}>
                {theme === 'dark' ? <FiSun size={24} /> : <FiMoon size={24} />}
              </IconButton>
            </Tooltip>
          )}

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
