import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Validate check-in (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async() => {
        await app.close()
    })

    it('should be able to validate the check-ins', async () => {

      const { token } = await createAndAuthenticateUser(app, true)

      const user = await prisma.user.findFirstOrThrow()

      const gym = await prisma.gym.create({
          data: {
              title: 'test_gym',
              latitude: -23.1565477,
              longitude: -46.9122963, 
          }
      })

      let checkInId = await prisma.checkIn.create({
        data: {
          gym_id: gym.id,
          user_id: user.id,
        },
      })

      const response = await await request(app.server)
      .patch(`/check-ins/${checkInId.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

      expect(response.statusCode).toEqual(204)

      checkInId = await prisma.checkIn.findUniqueOrThrow({
        where: {
          id: checkInId.id,
        }
      })

      expect(checkInId.validated_at).toEqual(expect.any(Date))

    })
})