import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middleware/verify-jwt'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { refresh } from './refreshToken'


export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  
  app.post('/sessions', authenticate)

  app.get('/me', { onRequest: [verifyJWT]}, profile)

  app.patch('/token/refresh', refresh)
}
