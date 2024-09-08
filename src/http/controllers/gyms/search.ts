import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymBodySchema = z.object({
    search: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { search, page } = searchGymBodySchema.parse(request.body)

const searchGymUseCase = makeSearchGymsUseCase()

const { gyms } = await searchGymUseCase.execute({
    search,
    page
})

  return reply.status(201).send({
    gyms
  })
}
