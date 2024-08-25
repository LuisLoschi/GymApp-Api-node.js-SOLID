import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundedError } from './errors/resourse-not-founded'

let userRepository: InMemoryRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
    beforeEach(() => {
        userRepository = new InMemoryRepository()
        sut = new GetUserProfileUseCase(userRepository)
    })

    it('should be able to get user profile', async () => {
        const createdUser = await userRepository.create({
            name: 'testeUserProfile',
            email: 'teste@test.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            userId: createdUser.id,
        })

        expect(user.id).toEqual(expect.any(String))
        expect(user.name).toEqual('testeUserProfile')
    })


    it('should not be able to get user profile with wrong id', async () => {
        await expect(() => sut.execute({
            userId: 'no-exist-id'
        })).rejects.toBeInstanceOf(ResourceNotFoundedError)

    })
})