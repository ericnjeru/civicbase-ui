import * as z from 'zod'

export const validationSchema = z.object({
  name: z.string().nonempty('Your name is required'),
  email: z.string().nonempty('Your email is required').email('A valid email is required'),
  password: z.string().nonempty('Your password is required').min(6, { message: 'Must be 6 or more characters long' }),
  TC: z.boolean().refine((val) => val),
})
