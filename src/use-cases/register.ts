import { UserRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlredyExistError } from './errors/user-alredy-exists-error'
import { User } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private userRepository: UserRepository){}

  async execute({ name, email, password }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)
  
    const userWithSameEmail = await this.userRepository.findByEmail(email)
  
    if (userWithSameEmail) {
      throw new UserAlredyExistError()
    }
  
    //const prismaUsersRepository = new PrismaUsersRepository()
  
    const user = await this.userRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      user
    }
  }
}

