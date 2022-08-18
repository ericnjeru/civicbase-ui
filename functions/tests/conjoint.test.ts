import 'dotenv/config'
import request from 'supertest'
import * as survey from './utils/survey'

describe('Conjoint', () => {
  let conjointSurveyId: string | null = null

  it('create survey', async () => {
    const response = await request(process.env.test_base_endpoint)
      .post('/createSurvey')
      .set('Authorization', `Bearer ${process.env.test_token}`)
      .set('credentials', 'include')
      .send(survey.conjoint)

    conjointSurveyId = response.body

    expect(response.status).toBe(201)
    expect(response.body).toBeDefined()
  })

  it('update survey', async () => {
    const response = await request(process.env.test_base_endpoint)
      .post(`/updateSurvey/${conjointSurveyId}`)
      .set('Authorization', `Bearer ${process.env.test_token}`)
      .set('credentials', 'include')
      .send({ ...survey.conjoint, setup: { ...survey.conjoint.setup, topic: '[Jest][Updated] Conjoint test' } })

    expect(response.status).toBe(201)
    expect(response.body).toBe(conjointSurveyId)
  })

  it('publish survey', async () => {
    const response = await request(process.env.test_base_endpoint)
      .get(`/publish/${conjointSurveyId}`)
      .set('Authorization', `Bearer ${process.env.test_token}`)
      .set('credentials', 'include')

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Published')
  })

  it('finish survey', async () => {
    const response = await request(process.env.test_base_endpoint)
      .get(`/finish/${conjointSurveyId}`)
      .set('Authorization', `Bearer ${process.env.test_token}`)
      .set('credentials', 'include')

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Finished')
  })

  it('clone survey', async () => {
    const response = await request(process.env.test_base_endpoint)
      .get(`/clone/${conjointSurveyId}`)
      .set('Authorization', `Bearer ${process.env.test_token}`)
      .set('credentials', 'include')

    expect(response.status).toBe(201)
    expect(response.body.setup.topic).toContain('clone')
    expect(response.status).not.toBe(conjointSurveyId)
  })

  it('get survey for analytics', async () => {
    const response = await request(process.env.test_base_endpoint)
      .get(`/analytics/${conjointSurveyId}`)
      .set('Authorization', `Bearer ${process.env.test_token}`)
      .set('credentials', 'include')

    const { survey, csv, results } = response.body

    expect(response.status).toBe(200)
    expect(survey).toBeDefined()
    expect(csv).toBeDefined()
    expect(results).toBeDefined()
  })

  it('delete survey', async () => {
    const response = await request(process.env.test_base_endpoint)
      .delete(`/delete/${conjointSurveyId}`)
      .set('Authorization', `Bearer ${process.env.test_token}`)
      .set('credentials', 'include')

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Deleted.')
  })
})
