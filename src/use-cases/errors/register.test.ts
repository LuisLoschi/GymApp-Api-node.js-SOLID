import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from '../register'
import { compare } from 'bcryptjs'
import { InMemoryRepository } from '@/repositories/in-memory/im-memory-users-repository'
import { UserAlredyExistError } from './user-alredy-exists-error'

describe('Register Use Case', () => {
    it('should be able to register', async () => {
        const userRepository = new InMemoryRepository()
        const registerUseCase = new RegisterUseCase(userRepository)

        const { user } = await registerUseCase.execute({
            name: 'teste',
            email: 'teste@test.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })


    it('should hash user password upon registration', async () => {
        const userRepository = new InMemoryRepository()
        const registerUseCase = new RegisterUseCase(userRepository)

        const { user } = await registerUseCase.execute({
            name: 'teste',
            email: 'teste@test.com',
            password: '123456'
        })

        const isPassowrdCorrectlyHashed = await compare(
            '123456',
            user.password_hash
        )

        expect(isPassowrdCorrectlyHashed).toBe(true)
    })


    it('should not be able to register with same email twice', async () => {
        const userRepository = new InMemoryRepository()
        const registerUseCase = new RegisterUseCase(userRepository)

        const email = 'teste@test.com'

        await registerUseCase.execute({
            name: 'teste',
            email,
            password: '123456'
        })


        await expect(() => 
            registerUseCase.execute({
                name: 'teste',
                email,
                password: '123456'
            }),
        ).rejects.toBeInstanceOf(UserAlredyExistError)     
    })
})