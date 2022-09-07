import 'dotenv/config'
import request from 'supertest'

describe('user functions', () => {
  it('should get user details', async () => {
    const response = await request(process.env.test_base_endpoint)
      .get('/user')
      .set('Authorization', `Bearer ${process.env.test_token}`)
      .set('credentials', 'include')

    expect(response.body.user.name).toBe(process.env.test_name)
    expect(response.body.user.email).toBe(process.env.test_email)
  })
})
