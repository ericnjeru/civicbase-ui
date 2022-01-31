import useAsync from 'hooks/use-async'
import { createContext, ReactElement, useCallback, useContext, useLayoutEffect, useMemo } from 'react'
import bootstrapAppData from 'utilities/bootstrap'
import * as authClient from 'services/auth'
import storage from 'utilities/storage'
import { CivicbaseUser } from '../../types/user.d'
import { LoginReponse, SignupResponse, LogoutResponse, ResetResponse } from '../../types/response.d'
import { LoginRequest, SignupRequest, ResetRequest } from '../../types/request.d'

interface Authentication {
  user?: CivicbaseUser
  login?: (form: LoginRequest) => Promise<LoginReponse>
  logout?: () => Promise<LogoutResponse>
  signup?: (form: SignupRequest) => Promise<SignupResponse>
  reset?: (form: ResetRequest) => Promise<ResetResponse>
}

const initialData: Authentication = {
  user: undefined,
  login: undefined,
  logout: undefined,
  signup: undefined,
  reset: undefined,
}

const AuthContext = createContext(initialData)

export const AuthProvider = ({ ...props }): ReactElement => {
  const { data, isError, isSuccess, run, isIdle, isLoading, setData } = useAsync()

  useLayoutEffect(() => {
    run(bootstrapAppData())
  }, [run])

  const login = useCallback((form) => authClient.login(form).then((user) => setData({ user })), [setData])
  const signup = useCallback((form) => authClient.signup(form), [])
  const logout = useCallback(() => authClient.logout().then(() => setData(null)), [setData])
  const reset = useCallback((form) => authClient.reset(form).then(() => setData(null)), [setData])

  const user = data?.user
  const value = useMemo(() => ({ user, login, logout, signup, reset }), [user, login, logout, signup, reset])

  if (isLoading || isIdle) {
    return <div>loading</div>
  }

  if (isError) {
    if (storage.hasToken()) {
      logout()
    } else {
      // TODO reauthenticate
    }
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />
  }

  throw new Error('Unhandled status')
}

export const useAuth = (): Authentication => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth() must be use within a AuthProvider')
  }

  return context
}
