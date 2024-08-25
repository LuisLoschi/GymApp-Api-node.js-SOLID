import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let userRepository: InMemoryRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
    beforeEach(() => {
        userRepository = new InMemoryRepository()
        sut = new AuthenticateUseCase(userRepository)
    })

    it('should be able to authenticate', async () => {
        await userRepository.create({
            name: 'testeAuth',
            email: 'teste@test.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            email: 'teste@test.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })


    it('should not be able to authenticate with wrong email', async () => {
        await expect(() => sut.execute({
            email: 'testeWrongEmail@test.com',
            password: '123456',
        })).rejects.toBeInstanceOf(InvalidCredentialsError)

    })

    it('should not be able to authenticate with wrong password', async () => {
        await userRepository.create({
            name: 'testePassword',
            email: 'teste@test.com',
            password_hash: await hash('123456', 6)
        })

        await expect(() => sut.execute({
            email: 'teste@test.com',
            password: '654321',
        })).rejects.toBeInstanceOf(InvalidCredentialsError)

    })
})