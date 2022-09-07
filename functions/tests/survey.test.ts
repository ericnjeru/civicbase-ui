import 'dotenv/config'
import request from 'supertest'
import * as survey from './utils/survey'

describe('survey functions', () => {
  describe('dasboard', () => {
    let qvSurveyId: string | null = null
    let likertSurveyId: string | null = null
    let conjointSurveyId: string | null = null

    beforeAll(async () => {
      const responseA = await request(process.env.test_base_endpoint)
        .post('/createSurvey')
        .set('Authorization', `Bearer ${process.env.test_token}`)
        .set('credentials', 'include')
        .send(survey.quadratic)

      const responseB = await request(process.env.test_base_endpoint)
        .post('/createSurvey')
        .set('Authorization', `Bearer ${process.env.test_token}`)
        .set('credentials', 'include')
        .send(survey.likert)

      const responseC = await request(process.env.test_base_endpoint)
        .post('/createSurvey')
        .set('Authorization', `Bearer ${process.env.test_token}`)
        .set('credentials', 'include')
        .send(survey.conjoint)

      qvSurveyId = responseA.body
      likertSurveyId = responseB.body
      conjointSurveyId = responseC.body
    })

    it('get all surveys', async () => {
      const response = await request(process.env.test_base_endpoint)
        .get('/surveys')
        .set('Authorization', `Bearer ${process.env.test_token}`)
        .set('credentials', 'include')

      const surveys = response.body

      expect(surveys.length).toBeGreaterThanOrEqual(3)
      expect(response.status).toBe(200)

      const conjoit = surveys.find(({ id }: { id: string }) => id === conjointSurveyId)
      const quadratic = surveys.find(({ id }: { id: string }) => id === qvSurveyId)
      const likert = surveys.find(({ id }: { id: string }) => id === conjointSurveyId)

      expect(conjoit).toBeDefined()
      expect(quadratic).toBeDefined()
      expect(likert).toBeDefined()
    })

    it('get a survey', async () => {
      const responseA = await request(process.env.test_base_endpoint)
        .get(`/survey/${qvSurveyId}`)
        .set('Authorization', `Bearer ${process.env.test_token}`)
        .set('credentials', 'include')

      const responseB = await request(process.env.test_base_endpoint)
        .get(`/survey/${likertSurveyId}`)
        .set('Authorization', `Bearer ${process.env.test_token}`)
        .set('credentials', 'include')

      const responseC = await request(process.env.test_base_endpoint)
        .get(`/survey/${conjointSurveyId}`)
        .set('Authorization', `Bearer ${process.env.test_token}`)
        .set('credentials', 'include')

      expect(responseA.body.id).toBe(qvSurveyId)
      expect(responseB.body.id).toBe(likertSurveyId)
      expect(responseC.body.id).toBe(conjointSurveyId)
    })
  })
})
