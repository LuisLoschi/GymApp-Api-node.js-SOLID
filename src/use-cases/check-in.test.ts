import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkin-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins'

let checkInRepository: InMemoryCheckInRepository
let gymRepository: InMemoryGymsRepository
let sut: CheckInUseCase


describe('Check-In Use Case', () => {
    beforeEach( async () => {
        gymRepository = new InMemoryGymsRepository()
        checkInRepository = new InMemoryCheckInRepository()
        sut = new CheckInUseCase(checkInRepository, gymRepository)
        
        await gymRepository.create({
            id: 'gym-01',
            title: 'SmartGym',
            description: '',
            phone: '',
            latitude: new Decimal(-23.1282591),
            longitude: new Decimal(-46.8254176),
        })

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check in', async () => {
       
        const { checkin } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -23.1282591,
            userLongitude: -46.8254176,
        })

        expect(checkin.id).toEqual(expect.any(String))
    })


    it('should not be able to check in twice in the same day', async () => {

        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -23.1282591,
            userLongitude: -46.8254176,
        })

        await expect(() => sut.execute({
                gymId: 'gym-01',
                userId: 'user-01',
                userLatitude: -23.1282591,
                userLongitude: -46.8254176,
            })
        ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
    })

    it('should be able to check in twice but in different days', async () => {

        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))
        
        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -23.1282591,
            userLongitude: -46.8254176,
        })

        vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0))

        const { checkin } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -23.1282591,
            userLongitude: -46.8254176,
        })
        
        expect(checkin.id).toEqual(expect.any(String))
    })

    it('should not be able to check in on distant gym', async () => {
        gymRepository.items.push({
            id: 'gym-02-test',
            title: 'SmartGym',
            description: '',
            phone: '',
            latitude: new Decimal(-23.1282591),
            longitude: new Decimal(-46.8254176),
        })
       
        await expect(() => sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -23.1314997,
            userLongitude: -46.8924137,
        })
        ).rejects.toBeInstanceOf(MaxDistanceError)
    })

})