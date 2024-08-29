import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkin-repository'
import { GetUserMetricUseCase } from './get-user-metricts'

let checkInRepository: InMemoryCheckInRepository
let sut: GetUserMetricUseCase


describe('Fetch check-In Use Case', () => {
    beforeEach( async () => {
        checkInRepository = new InMemoryCheckInRepository()
        sut = new GetUserMetricUseCase(checkInRepository)
        
    })

    it('should be able to get check-ins count from metrics', async () => {
        await checkInRepository.create({
            gym_id: 'teste-01',
            user_id: 'user-01',
        })

        await checkInRepository.create({
            gym_id: 'teste-02',
            user_id: 'user-01',
        })

        const { checkInsCount } = await sut.execute({
            userId: 'user-01',
        })

        expect(checkInsCount).toEqual(2)
    })
})