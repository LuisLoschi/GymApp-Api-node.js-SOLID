import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'


describe('Create gym (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async() => {
        await app.close()
    })

    it('should be able to create gyms', async () => {

        const { token } = await createAndAuthenticateUser(app)

        const response = await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'test_gym',
                description: 'test',
                phone: '1199999999',
                latitude: -23.1565477,
                longitude: -46.9122963,              
            })

        expect(response.statusCode).toEqual(201)
    })
})