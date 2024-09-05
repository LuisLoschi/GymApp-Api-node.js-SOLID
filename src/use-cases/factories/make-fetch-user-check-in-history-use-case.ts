import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-check-ins-history"

export function makeFetchUserCheckInHistoryUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository()
    const UseCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository)

    return UseCase
}