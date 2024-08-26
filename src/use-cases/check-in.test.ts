import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkin-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInRepository: InMemoryCheckInRepository
let gymRepository: InMemoryGymsRepository
let sut: CheckInUseCase


describe('Check-In Use Case', () => {
    beforeEach(() => {
        gymRepository = new InMemoryGymsRepository()
        checkInRepository = new InMemoryCheckInRepository()
        sut = new CheckInUseCase(checkInRepository, gymRepository)
        vi.useFakeTimers()

        gymRepository.items.push({
            id: 'gym-01',
            title: 'SmartGym',
            description: '',
            phone: '',
            latitude: new Decimal(0),
            longitude: new Decimal(0),
           })
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check in', async () => {
       
        const { checkin } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0,
        })

        expect(checkin.id).toEqual(expect.any(String))
    })


    it('should not be able to check in twice in the same day', async () => {

        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0,
        })

        await expect(() => sut.execute({
                gymId: 'gym-01',
                userId: 'user-01',
                userLatitude: 0,
                userLongitude: 0,
            })
        ).rejects.toBeInstanceOf(Error)
    })

    it('should be able to check in twice but in different days', async () => {

        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))
        
        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0,
        })

        vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0))

        const { checkin } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0,
        })
        
        expect(checkin.id).toEqual(expect.any(String))
    })

})