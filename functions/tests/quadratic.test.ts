import 'dotenv/config'
import request from 'supertest'
import * as survey from './utils/survey'

describe('Quadratic', () => {
  let qvSurveyId: string | null = null

  it('create survey', async () => {
    const response = await request(process.env.test_base_endpoint)
      .post('/createSurvey')
      .set('Authorization', `Bearer ${process.env.test_token}`)
      .set('credentials', 'include')
      .send(survey.quadratic)

    qvSurveyId = response.body

    expect(response.status).toBe(201)
    expect(response.body).toBeDefined()
  })

  it('update survey', async () => {
    const response = await request(process.env.test_base_endpoint)
      .post(`/updateSurvey/${qvSurveyId}`)
      .set('Authorization', `Bearer ${process.env.test_token}`)
      .set('credentials', 'include')
      .send({ ...survey.quadratic, setup: { ...survey.quadratic.setup, topic: '[Jest][Updated] Quadratic test' } })

    expect(response.status).toBe(201)
    expect(response.body).toBe(qvSurveyId)
  })

  it('publish survey', async () => {
    const response = await request(process.env.test_base_endpoint)
      .get(`/publish/${qvSurveyId}`)
      .set('Authorization', `Bearer ${process.env.test_token}`)
      .set('credentials', 'include')

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Published')
  })

  it('finish survey', async () => {
    const response = await request(process.env.test_base_endpoint)
      .get(`/finish/${qvSurveyId}`)
      .set('Authorization', `Bearer ${process.env.test_token}`)
      .set('credentials', 'include')

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Finished')
  })

  it('clone survey', async () => {
    const response = await request(process.env.test_base_endpoint)
      .get(`/clone/${qvSurveyId}`)
      .set('Authorization', `Bearer ${process.env.test_token}`)
      .set('credentials', 'include')

    expect(response.status).toBe(201)
    expect(response.body.setup.topic).toContain('clone')
    expect(response.status).not.toBe(qvSurveyId)
  })

  it('get survey for analytics', async () => {
    const response = await request(process.env.test_base_endpoint)
      .get(`/analytics/${qvSurveyId}`)
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
      .delete(`/delete/${qvSurveyId}`)
      .set('Authorization', `Bearer ${process.env.test_token}`)
      .set('credentials', 'include')

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Deleted.')
  })
})
