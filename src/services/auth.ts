import * as api from './api'
import storage from 'utilities/storage'
import { LoginRequest, SignupRequest, ResetRequest } from '../../types/request.d'
import { LoginReponse, SignupResponse } from '../../types/response.d'

export const signup = ({ name, email, password }: SignupRequest): Promise<SignupResponse> => {
  return api.client('signup', { body: { name, email, password } }).then((data) => data)
}

export const getUser = () => {
  if (!storage.hasToken) {
    return Promise.resolve(null)
  }

  return api.client('user').then(({ user }) => user)
}

export const login = ({ email, password }: LoginRequest): Promise<LoginReponse> =>
  api.client('login', { body: { email, password } }).then(({ user, token }) => {
    storage.setToken(token)
    return user
  })

export const logout = () => api.client('logout').then(() => storage.clearToken())

export const reset = ({ email }: ResetRequest) =>
  api.client('reset', { body: { email } }).then(({ message }) => message)
