import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase


describe('Fetch nearby Gyms Use Case', () => {
    beforeEach( async () => {
        gymRepository = new InMemoryGymsRepository()
        sut = new FetchNearbyGymsUseCase(gymRepository)
        
    })

    it('should be able to fetch nearby gyms', async () => {
        await gymRepository.create({
            title: 'teste-Near-Gym',
            description: '',
            phone: '',
            latitude: -23.1565477,
            longitude: -46.9122963,
        })

        await gymRepository.create({
            title: 'teste-Far-Gym',
            description: '',
            phone: '',
            latitude: -23.4603056,
            longitude: -46.5277372,
        })

        const { gyms } = await sut.execute({
          userLatitude: -23.1389056,
          userLongitude: -46.914167,
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'teste-Near-Gym'})
        ])
    })
})