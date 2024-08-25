import { describe, expect, it } from 'vitest'
import { InMemoryRepository } from '@/repositories/in-memory/im-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
    it('should be able to authenticate', async () => {
        const userRepository = new InMemoryRepository()
        const sut = new AuthenticateUseCase(userRepository)

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
        const userRepository = new InMemoryRepository()
        const sut = new AuthenticateUseCase(userRepository)

        expect(() => sut.execute({
            email: 'testeWrongEmail@test.com',
            password: '123456',
        })).rejects.toBeInstanceOf(InvalidCredentialsError)

    })

    it('should not be able to authenticate with wrong password', async () => {
        const userRepository = new InMemoryRepository()
        const sut = new AuthenticateUseCase(userRepository)

        await userRepository.create({
            name: 'testePassword',
            email: 'teste@test.com',
            password_hash: await hash('123456', 6)
        })

        expect(() => sut.execute({
            email: 'teste@test.com',
            password: '654321',
        })).rejects.toBeInstanceOf(InvalidCredentialsError)

    })
})