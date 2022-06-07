import * as z from 'zod'
import { surveyMethods } from 'utilities/constants'

export const validationSchema = z
  .object({
    setup: z.object({
      credits: z
        .number()
        .min(1, { message: 'Credits must be a positive value greater than 0' })
        .max(1000, { message: 'Credits must be less than 1001' })
        .optional(),
      topic: z
        .string()
        .min(3, { message: 'Topic must have at least 3 characters' })
        .max(50, { message: 'Topic must have max 50 characters' }),
      method: z.string({ invalid_type_error: 'Method must be selected' }),
      feedback: z
        .object({
          active: z.boolean().optional(),
          questions: z
            .array(
              z.object({
                question: z
                  .string()
                  .min(3, { message: 'Feedback question must have more than 2 characters' })
                  .max(250, { message: 'Feedback question must have less than 250 characters' }),
              }),
            )
            .optional(),
        })
        .optional()
        .refine((feedback) => !(feedback?.active && feedback?.questions?.length === 0), {
          message: 'You should have at least 1 question',
        }),
    }),
    language: z
      .object({
        jargon: z.string({ invalid_type_error: 'Preferred Language must be selected' }).optional(),
        thumbsUp: z.string({ invalid_type_error: 'Thumbs Up is required' }).nullable().optional(),
        thumbsDown: z.string({ invalid_type_error: 'Thumbs Down is required' }).nullable().optional(),
        token: z.string({ invalid_type_error: 'Preferred Token must be selected' }).optional(),
        customToken: z.string({ invalid_type_error: 'Custom Credit Language is required' }).nullable().optional(),
      })
      .optional()
      .nullable()
      .refine((data) => !(data?.jargon === 'Custom' && data.thumbsUp === ''), {
        message: 'Thumbs Up is required',
        path: ['thumbsUp'],
      })
      .refine((data) => !(data?.jargon === 'Custom' && data.thumbsDown === ''), {
        message: 'Thumbs Down is required',
        path: ['thumbsDown'],
      })
      .refine((data) => !(data?.token === 'Custom' && data.customToken === ''), {
        message: 'Custom Credit Language is required',
        path: ['customToken'],
      }),
    message: z
      .object({
        welcome: z.any().optional(),
        completion: z.any().optional(),
      })
      .optional(),
    quadratic: z
      .array(
        z
          .object({
            statement: z.any(),
            id: z.string().optional(),
          })
          .refine((data) => !(data.statement.getCurrentContent().getPlainText('\u0001') === ''), {
            message: 'This question is required',
          }),
      )
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
        z
          .object({
            id: z.string().optional(),
            statement: z.any(),
            items: z.any(),
            attributes: z.any(),
          })
          .refine((data) => !(data.statement.getCurrentContent().getPlainText('\u0001') === ''), {
            message: 'This question is required',
          }),
      )
      .optional(),
    likert: z
      .array(
        z
          .object({
            id: z.string().optional(),
            statement: z.any(),
            items: z.array(
              z.object({
                description: z.string().min(1, { message: 'Item description must have more than 1 characters' }),
              }),
            ),
          })
          .refine((data) => !(data.statement.getCurrentContent().getPlainText('\u0001') === ''), {
            message: 'This question is required',
            path: ['statement'],
          }),
      )
      .optional(),
  })
  .refine(
    (data) => {
      if (data.setup.method === surveyMethods.Quadratic && data.quadratic && data.quadratic.length < 3) {
        return false
      }
      return true
    },
    { message: 'You should have at least 3 questions', path: ['quadratic'] },
  )
  .refine(
    (data) => {
      if (data.setup.method === surveyMethods.Likert && data.likert && data.likert.length === 0) {
        return false
      }
      return true
    },
    { message: 'You should have at least 1 questions', path: ['likert'] },
  )
  .refine(
    (data) => {
      if (data.setup.method === surveyMethods.Conjoint && data.conjoint && data.conjoint.length === 0) {
        return false
      }
      return true
    },
    { message: 'You should have at least 1 questions', path: ['conjoint'] },
  )
