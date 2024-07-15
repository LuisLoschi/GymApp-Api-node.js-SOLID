import fastify from 'fastify'
import { appRoutes } from './http/routes/route'

export const app = fastify()

app.register(appRoutes)
