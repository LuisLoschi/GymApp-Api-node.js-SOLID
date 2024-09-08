import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchUserCheckInHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-in-history-use-case'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const historyGymBodySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = historyGymBodySchema.parse(request.query)

const historyGymUseCase = makeFetchUserCheckInHistoryUseCase()

const { checkIns } = await historyGymUseCase.execute({
  userId: request.user.sub,  
  page,
})

  return reply.status(201).send({
    checkIns
  })
}
