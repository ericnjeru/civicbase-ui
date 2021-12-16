import * as z from 'zod'

export const validationSchema = z.object({
  setup: z.object({
    credits: z
      .number()
      .min(1, { message: 'Credits must be a positive value greater than 0' })
      .max(1000, { message: 'Credits must be less than 1001' }),
    topic: z
      .string()
      .min(3, { message: 'Topic must have at least 3 characters' })
      .max(50, { message: 'Topic must have max 50 characters' }),
    function: z.string(),
  }),
  language: z
    .object({
      jargon: z.string(),
      thumbsUp: z.string().optional(),
      thumbsDown: z.string().optional(),
      token: z.string(),
      customToken: z.string().optional(),
    })
    .refine(
      (data) => {
        if (data.jargon === 'Custom') {
          return !!data.thumbsUp
        }
        return true
      },
      { message: 'Thumbs Up is required', path: ['thumbsUp'] },
    )
    .refine(
      (data) => {
        if (data.jargon === 'Custom') {
          return !!data.thumbsDown
        }
        return true
      },
      { message: 'Thumbs Down is required', path: ['thumbsDown'] },
    )
    .refine(
      (data) => {
        if (data.token === 'Custom') {
          return !!data.customToken
        }
        return true
      },
      { message: 'Custom Credit Language is required', path: ['customToken'] },
    ),
  message: z.object({
    welcome: z.any().optional(),
    completion: z.any().optional(),
  }),
  questions: z
    .array(
      z.object({
        statement: z.string().min(4, { message: 'This question should have more than 3 characters' }),
        id: z.string().optional(),
      }),
    )
    .min(3, { message: 'There are minimun 3 questions' }),
  features: z
    .object({
      qualtrics: z.boolean().optional(),
      userIdentification: z.boolean().optional(),
    })
    .optional(),
})
