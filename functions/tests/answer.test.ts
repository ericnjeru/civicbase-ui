import 'dotenv/config'
import request from 'supertest'
import * as survey from './utils/survey'
import * as answer from './utils/answer'

describe('answer functions', () => {
  let qvSurveyId: string | null = null
  let likertSurveyId: string | null = null
  let conjointSurveyId: string | null = null

  beforeAll(async () => {
    await request(process.env.test_base_endpoint)
      .post('/createSurvey')
      .set('Authorization', `Bearer ${process.env.test_token}`)
      .set('credentials', 'include')
      .send(survey.quadratic)
      .expect(({ body }) => {
        qvSurveyId = body
      })

    await request(process.env.test_base_endpoint)
      .post('/createSurvey')
      .set('Authorization', `Bearer ${process.env.test_token}`)
      .set('credentials', 'include')
      .send(survey.likert)
      .expect(({ body }) => {
        likertSurveyId = body
      })

    await request(process.env.test_base_endpoint)
      .post('/createSurvey')
      .set('Authorization', `Bearer ${process.env.test_token}`)
      .set('credentials', 'include')
      .send(survey.conjoint)
      .expect(({ body }) => {
        conjointSurveyId = body
      })
  })

  describe('Quadratic', () => {
    it('should create an answer', async () => {
      const newAnswer = {
        ...answer.quadratic,
        surveyId: qvSurveyId,
      }

      const response = await request(process.env.test_base_endpoint)
        .post('/createAnswer')
        .set('credentials', 'include')
        .send(newAnswer)

      expect(response.status).toBe(201)
      expect(response.body).toBeDefined()
    })

    it('should get answer in survey analytics', async () => {
      const response = await request(process.env.test_base_endpoint)
        .get(`/analytics/${qvSurveyId}`)
        .set('Authorization', `Bearer ${process.env.test_token}`)
        .set('credentials', 'include')

      const { csv, results } = response.body

      expect(Object.keys(results.pilot).length).toBe(3)
      expect(csv.pilot.length).toBeGreaterThanOrEqual(1)
    })

    it('should show any added data to the csv', async () => {
      const newAnswer = {
        ...answer.quadratic,
        surveyId: qvSurveyId,
        userId: 'testId',
      }

      await request(process.env.test_base_endpoint)
        .post('/createAnswer')
        .set('credentials', 'include')
        .send(newAnswer)
        .then(async () => {
          const response = await request(process.env.test_base_endpoint)
            .get(`/analytics/${qvSurveyId}`)
            .set('Authorization', `Bearer ${process.env.test_token}`)
            .set('credentials', 'include')

          const { csv } = response.body

          const foundHeader = csv.pilot[0].find((h: string) => h === 'user id')
          const foundRow = csv.pilot[csv.pilot.length - 1].find((r: string) => r === 'testId')

          expect(foundHeader).toBeDefined()
          expect(foundRow).toBeDefined()
        })
    })
  })

  describe('Likert', () => {
    it('should create an answer', async () => {
      const newAnswer = {
        ...answer.likert,
        surveyId: likertSurveyId,
      }

      const response = await request(process.env.test_base_endpoint)
        .post('/createAnswer')
        .set('credentials', 'include')
        .send(newAnswer)

      expect(response.status).toBe(201)
      expect(response.body).toBeDefined()
    })
  })

  describe('Conjoint', () => {
    it('should create an answer', async () => {
      const newAnswer = {
        ...answer.conjoint,
        surveyId: conjointSurveyId,
      }

      const response = await request(process.env.test_base_endpoint)
        .post('/createAnswer')
        .set('credentials', 'include')
        .send(newAnswer)

      expect(response.status).toBe(201)
      expect(response.body).toBeDefined()
    })
  })
})
