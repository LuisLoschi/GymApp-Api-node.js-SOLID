import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middleware/verify-jwt'
import { create } from './create'
import { validate } from './validate'
import { history } from './history'
import { metric } from './metrics'


export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/gyms/:gymsId/check-ins', create)

  app.patch('/check-ins/:checkInId/validate', validate)

  app.get('/gyms/history', history)

  app.get('/gyms/metrics', metric)
}
