import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'

describe('Profile (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async() => {
        await app.close()
    })

    it('should be able to get user profile', async () => {

        const { token } = await createAndAuthenticateUser(app)

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