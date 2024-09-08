import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metric-use-case'

export async function metric(request: FastifyRequest, reply: FastifyReply) {

const getrUserMetricGymUseCase = makeGetUserMetricsUseCase()

const { checkInsCount } = await getrUserMetricGymUseCase.execute({
  userId: request.user.sub,  
})

  return reply.status(201).send({
    checkInsCount
  })
}
