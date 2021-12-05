import { lazy } from 'react'
import tw from 'twin.macro'
import Header from 'components/Header'
// import Banner from 'components/Banner'

const AuthenticatedApp = lazy(() => import('./AuthenticatedApp'))
const UnauthenticatedApp = lazy(() => import('./UnauthenticatedApp'))

const App = () => {
  const user = false
  return (
    <div css={tw`h-full overflow-hidden`}>
      <Header />
      {/* <Banner /> */}
      <>{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</>
    </div>
  )
}

export default App
