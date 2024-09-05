import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { GetUserProfileUseCase } from "../get-user-profile"

export function makeGetUserProfileUseCase() {
    const userRepository = new PrismaUsersRepository()
    const UseCase = new GetUserProfileUseCase(userRepository)

    return UseCase
}