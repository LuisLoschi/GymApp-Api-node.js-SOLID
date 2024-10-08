import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middleware/verify-jwt'
import { create } from './create'
import { validate } from './validate'
import { history } from './history'
import { metric } from './metrics'
import { verifyUserRole } from '@/http/middleware/verify-user-role'


export async function checkInRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/gyms/:gymId/check-ins', create)

  app.patch('/check-ins/:checkInId/validate', { onRequest: [verifyUserRole('ADMIN')]}, validate)

  app.get('/check-ins/history', history)

  app.get('/check-ins/metrics', metric)
}
