import * as z from 'zod'

export const validationSchema = z.object({
  email: z.string().nonempty('Your email is required').email('A valid email is required'),
  password: z.string().nonempty('Your password is required'),
})
