import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Profile (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async() => {
        await app.close()
    })

    it('should be able to get user profile', async () => {

        await request(app.server).post('/users').send({
            name: 'user_test',
            email: 'user_test@example.com',
            password: '123456'
        })


        const authResponse = await request(app.server)
            .post('/sessions')
            .send({
                email: 'user_test@example.com',
                password: '123456'
            })

        const { token } = authResponse.body

        const profileResponse = await request(app.server)
            .get('/me')
            .set('Authorization', `Bearer ${token}`)
            .send()

        const profileUser = JSON.parse(profileResponse.text)

        expect(profileResponse.statusCode).toEqual(200)
        expect(profileUser).toEqual(
            expect.objectContaining({
                email: 'user_test@example.com',
            })
        )
    })
})