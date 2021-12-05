export const client = async (endpoint: string, { body, ...other }: any = {}) => {
  const headers = { 'content-type': 'application/json' }
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
      return Promise.reject(data)
    }
  })
}
