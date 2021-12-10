import storage from 'utilities/storage'
import { BodyRequest } from '../../types/request.d'

interface Request {
  body?: BodyRequest
  headers?: HeadersInit
}

export const client = async (endpoint: string, { body, ...other }: Request = {}) => {
  const headers: HeadersInit = { 'content-type': 'application/json' }

  if (storage.hasToken) {
    headers.Authorization = `Bearer ${storage.getToken()}`
  }

  const config: RequestInit = {
    method: body ? 'POST' : 'GET',
    ...other,
    headers: {
      ...headers,
      ...other.headers,
    },

    credentials: 'include',
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  return window.fetch(`${process.env.REACT_APP_FUNCTION}/${endpoint}`, config).then(async (response) => {
    const data = await response.json()

    if (response.ok) {
      return data
    } else {
      storage.clearToken()

      return Promise.reject(data)
    }
  })
}
