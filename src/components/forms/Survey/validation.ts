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
    method: z.string(),
    feedback: z
      .object({
        active: z.boolean(),
        question: z.string(),
      })
      .optional(),
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
        statement: z.any(),
        id: z.string().optional(),
      }),
    )
    // .min(3, { message: 'There are minimun 3 questions' })
    .optional(),
  features: z
    .object({
      qualtrics: z.boolean().optional(),
      userIdentification: z.boolean().optional(),
      randomQuestions: z.boolean().optional(),
      multipleAnswerFromSameSource: z.boolean().optional(),
    })
    .optional(),
  conjoint: z
    .array(
      z.object({
        statement: z.string(),
        items: z.any(),
        attributes: z.any(),
      }),
    )
    .optional(),
})
