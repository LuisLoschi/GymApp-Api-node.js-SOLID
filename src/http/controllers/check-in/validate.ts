import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeValidateUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validadeParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

    const { checkInId } = validadeParamsSchema.parse(request.params)

    const validateUseCase = makeValidateUseCase()

    await validateUseCase.execute({
        checkInId
    })

  return reply.status(204).send()
}
