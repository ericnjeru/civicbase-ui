import * as auth from 'services/auth'

import { CivicbaseUser } from '../../types/user'
import storage from './storage'

const bootstrapAppData = async () => {
  let appData: { user: CivicbaseUser | null } = { user: null }

  if (storage.hasToken()) {
    const [user] = await Promise.all([auth.getUser()])

    appData = { user }
  }

  return appData
}

export default bootstrapAppData
