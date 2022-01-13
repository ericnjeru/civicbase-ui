const KEY = '__civicbase__'

export default {
  getToken: () => window.localStorage.getItem(KEY),
  setToken: (token: string) => window.localStorage.setItem(KEY, token),
  hasToken: () => !!window.localStorage.getItem(KEY),
  clearToken: () => window.localStorage.removeItem(KEY),
}
