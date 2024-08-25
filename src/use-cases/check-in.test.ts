import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkin-repository'
import { CheckInUseCase } from './check-in'

let checkInRepository: InMemoryCheckInRepository
let sut: CheckInUseCase


describe('Check-In Use Case', () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository()
        sut = new CheckInUseCase(checkInRepository)
    })

    it('should be able to check in', async () => {
        
        const { checkin } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
        })

        expect(checkin.id).toEqual(expect.any(String))
    })

})