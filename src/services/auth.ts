import { client } from './api'

export const createUser = ({ name, email, password }: { name: string; email: string; password: string }) => {
  return client('signup', { body: { name, email, password } }).then((data) => data)
}
