import storage from 'utilities/storage'

import { LoginRequest, SignupRequest, ResetRequest } from '../../types/request.d'
import { LoginReponse, SignupResponse } from '../../types/response.d'
import client from './api'

export const signup = ({ name, email, password }: SignupRequest): Promise<SignupResponse> =>
  client('signup', { body: { name, email, password } }).then((data) => data)

export const getUser = () => {
  if (!storage.hasToken) {
    return Promise.resolve(null)
  }

  return client('userProfile').then(({ user }) => user)
}

export const login = ({ email, password }: LoginRequest): Promise<LoginReponse> =>
  client('login', { body: { email, password } }).then(({ user, token }) => {
    storage.setToken(token)
    return user
  })

export const logout = () => client('logout').then(() => storage.clearToken())

export const reset = ({ email }: ResetRequest) =>
  client('resetPassword', { body: { email } }).then(({ message }) => message)
