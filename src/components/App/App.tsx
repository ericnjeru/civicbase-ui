import { lazy } from 'react'
import tw from 'twin.macro'
import Header from 'components/Header'
import { ErrorBoundary } from 'react-error-boundary'
import { useAuth } from 'contexts/auth'
import Banner from 'components/Banner'
import Toast from 'components/Toast'
import { ToastProvider } from 'contexts/toast'

const AuthenticatedApp = lazy(() => import('./AuthenticatedApp'))
const UnauthenticatedApp = lazy(() => import('./UnauthenticatedApp'))

const Fallback = () => <div>fallback</div>

const App = () => {
  const { user } = useAuth()

  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <ToastProvider>
        <div css={tw`h-full overflow-hidden relative`}>
          <Header />
          <Banner />

          <div css={tw`overflow-y-auto h-full`}>
            <div css={[tw`container mx-auto pt-36 pb-12 h-full`, !user && tw`pt-0`]}>
              {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
            </div>
          </div>
          <Toast />
        </div>
      </ToastProvider>
    </ErrorBoundary>
  )
}

export default App
