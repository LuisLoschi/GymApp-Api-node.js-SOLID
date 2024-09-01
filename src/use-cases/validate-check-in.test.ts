import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkin-repository'
import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundedError } from './errors/resourse-not-founded'


let CheckInRepository: InMemoryCheckInRepository
let sut: ValidateCheckInUseCase


describe('Validate Check-In Use Case', () => {
    beforeEach( async () => {
        CheckInRepository = new InMemoryCheckInRepository()
        sut = new ValidateCheckInUseCase(CheckInRepository)
        
        //vi.useFakeTimers()
    })

    afterEach(() => {
        //vi.useRealTimers()
    })

    it('should be able to validate check-in', async () => {
        const createdCheckIn = await CheckInRepository.create({
            gym_id: 'gym-validate-test',
            user_id: 'user-01',
        })
       
        const { checkIn } = await sut.execute({
            checkInId: createdCheckIn.id,
        })

        expect(checkIn.validated_at).toEqual(expect.any(Date))
        expect(CheckInRepository.items[0].validated_at).toEqual(expect.any(Date))
    })

    it('should not be able to validate an inexistent check-in', async () => {
       
        await expect(() => 
            sut.execute({
                checkInId: 'inexistent-check-in-id'
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundedError)
    })
})