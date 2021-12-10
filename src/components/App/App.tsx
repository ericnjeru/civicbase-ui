import { lazy } from 'react'
import tw from 'twin.macro'
import Header from 'components/Header'
import { ErrorBoundary } from 'react-error-boundary'
import { useAuth } from 'contexts/auth'
// import Banner from 'components/Banner'

const AuthenticatedApp = lazy(() => import('./AuthenticatedApp'))
const UnauthenticatedApp = lazy(() => import('./UnauthenticatedApp'))

const Fallback = () => <div>fallback</div>

const App = () => {
  const { user } = useAuth()

  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <div css={tw`h-full overflow-hidden`}>
        <Header />
        {/* <Banner /> */}

        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </div>
    </ErrorBoundary>
  )
}

export default App
