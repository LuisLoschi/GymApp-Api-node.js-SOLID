import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { CreateGymUseCase } from './create-gym'

let gymRepository:  InMemoryGymsRepository
let sut: CreateGymUseCase


describe('Create gym Use Case', () => {
    beforeEach(() => {
        gymRepository = new InMemoryGymsRepository()
        sut = new CreateGymUseCase(gymRepository)
    })

    it('should be able to create a gym', async () => {
        
        const { gym } = await sut.execute({
            title: 'gym-01-test',
            description: '',
            phone: '',
            latitude: 0,
            longitude: 0,
        })

        expect(gym.id).toEqual(expect.any(String))
    })


    
})