import * as auth from 'services/auth'
import storage from './storage'
// TODO: resolve any
const bootstrapAppData = async () => {
  let appData: any = { user: null }

  if (storage.hasToken) {
    const [user] = await Promise.all([auth.getUser()])

    appData = { user }
  }

  return appData
}

export default bootstrapAppData
