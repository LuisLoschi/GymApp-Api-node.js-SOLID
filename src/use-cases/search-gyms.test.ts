import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase


describe('Search Gyms Use Case', () => {
    beforeEach( async () => {
        gymRepository = new InMemoryGymsRepository()
        sut = new SearchGymsUseCase(gymRepository)
        
    })

    it('should be able to search for gyms', async () => {
        await gymRepository.create({
            title: 'teste-01',
            description: '',
            phone: '',
            latitude: 0,
            longitude: 0,
        })

        await gymRepository.create({
            title: 'teste-02',
            description: '',
            phone: '',
            latitude: 0,
            longitude: 0,
        })

        const { gyms } = await sut.execute({
            search: 'teste-01',
            page: 1
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'teste-01'})
        ])
    })

    it('should be able to fetch paginated gym search', async () => {
        for(let i = 1; i <= 22; i++) {
            await gymRepository.create({
                title: `teste-${i}`,
                description: '',
                phone: '',
                latitude: 0,
                longitude: 0,
            })
        }

        const { gyms } = await sut.execute({
            search: 'teste',
            page: 2
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'teste-21'}),
            expect.objectContaining({ title: 'teste-22'})
        ])
    })

})