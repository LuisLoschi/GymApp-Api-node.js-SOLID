import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'

describe('Search gyms (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async() => {
        await app.close()
    })

    it('should be able to search gyms', async () => {

        const { token } = await createAndAuthenticateUser(app, true)

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'test_searchGym_01',
                description: 'test',
                phone: '1199999999',
                latitude: -23.1565477,
                longitude: -46.9122963,              
            })
    
        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'test_searchGym_02',
                description: 'test',
                phone: '1199999999',
                latitude: -23.1565477,
                longitude: -46.9122963,              
            })

        const response = await request(app.server)
            .get('/gyms/search')
            .query({
                search: 'test_searchGym_01'
            })
            .set('Authorization', `Bearer ${token}`)
            .send()


        expect(response.statusCode).toEqual(201)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'test_searchGym_01'
            })
        ])
        
    })
})