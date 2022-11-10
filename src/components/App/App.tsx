import { lazy } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import Banner from 'components/Banner'
import Header from 'components/Header'
import Toast from 'components/Toast'
import { useAuth } from 'contexts/auth'
import { ToastProvider } from 'contexts/toast'
import tw from 'twin.macro'

const AuthenticatedApp = lazy(() => import(/* webpackChunkName: "AuthenticatedApp" */ './AuthenticatedApp'))
const UnauthenticatedApp = lazy(() => import(/* webpackChunkName: "UnauthenticatedApp" */ './UnauthenticatedApp'))

const Fallback = () => <div>fallback</div>

const App = () => {
  const { user } = useAuth()

  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <ToastProvider>
        <div css={tw`h-full overflow-hidden relative`}>
          {user && <Header />}
          <Banner />

          <div css={tw`overflow-y-auto h-full`}>{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</div>
          <Toast />
        </div>
      </ToastProvider>
    </ErrorBoundary>
  )
}

export default App
