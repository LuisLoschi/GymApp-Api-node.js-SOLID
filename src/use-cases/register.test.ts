import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlredyExistError } from './errors/user-alredy-exists-error'

let userRepository:  InMemoryRepository
let sut: RegisterUseCase


describe('Register Use Case', () => {
    beforeEach(() => {
        userRepository = new InMemoryRepository()
        sut = new RegisterUseCase(userRepository)
    })

    it('should be able to register', async () => {
        
        const { user } = await sut.execute({
            name: 'teste',
            email: 'teste@test.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })


    it('should hash user password upon registration', async () => {

        const { user } = await sut.execute({
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

        const email = 'teste@test.com'

        await sut.execute({
            name: 'teste',
            email,
            password: '123456'
        })


        await expect(() => 
            sut.execute({
                name: 'teste',
                email,
                password: '123456'
            }),
        ).rejects.toBeInstanceOf(UserAlredyExistError)     
    })
})