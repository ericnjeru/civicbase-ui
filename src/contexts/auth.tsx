import { createContext, ReactElement, useCallback, useContext, useLayoutEffect, useMemo } from 'react'

import useAsync from 'hooks/use-async'
import * as authClient from 'services/auth'
import bootstrapAppData from 'utilities/bootstrap'
import storage from 'utilities/storage'

import { LoginRequest, SignupRequest, ResetRequest } from '../../types/request.d'
import { LoginReponse, SignupResponse, LogoutResponse, ResetResponse } from '../../types/response.d'
import { CivicbaseUser } from '../../types/user.d'

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
  const logout = useCallback(
    () =>
      authClient.logout().then(() => {
        window.location.assign('/')
        return setData(null)
      }),
    [setData],
  )
  const reset = useCallback((form) => authClient.reset(form).then(() => setData(null)), [setData])

  const user = data?.user
  const value = useMemo(() => ({ user, login, logout, signup, reset }), [user, login, logout, signup, reset])

  if (isLoading || isIdle) {
    return <div>loading</div>
  }

  if (isError) {
    if (storage.hasToken()) {
      storage.clearToken()
    }

    window.location.assign('/')
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
