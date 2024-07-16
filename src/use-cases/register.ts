import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private userRepository: any){

  }

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)
  
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })
  
    if (userWithSameEmail) {
      throw new Error('Email alredy exist.')
    }
  
    //const prismaUsersRepository = new PrismaUsersRepository()
  
    await this.userRepository.create({
      name,
      email,
      password_hash,
    })
  }

}

