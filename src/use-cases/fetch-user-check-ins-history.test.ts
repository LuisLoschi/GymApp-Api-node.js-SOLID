import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkin-repository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

let checkInRepository: InMemoryCheckInRepository
let sut: FetchUserCheckInsHistoryUseCase


describe('Fetch check-In Use Case', () => {
    beforeEach( async () => {
        checkInRepository = new InMemoryCheckInRepository()
        sut = new FetchUserCheckInsHistoryUseCase(checkInRepository)
        
    })

    it('should be able to fetch check-in history', async () => {
        await checkInRepository.create({
            gym_id: 'teste-01',
            user_id: 'user-01',
        })

        await checkInRepository.create({
            gym_id: 'teste-02',
            user_id: 'user-01',
        })

        const { checkIns } = await sut.execute({
            userId: 'user-01',
            page: 1
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'teste-01'}),
            expect.objectContaining({ gym_id: 'teste-02'})
        ])
    })

    it('should be able to fetch paginated check-in history', async () => {
        for(let i = 1; i <= 22; i++) {
            await checkInRepository.create({
                gym_id: `teste-${i}`,
                user_id: 'user-01'
            })
        }

        const { checkIns } = await sut.execute({
            userId: 'user-01',
            page: 2
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'teste-21'}),
            expect.objectContaining({ gym_id: 'teste-22'})
        ])
    })

})