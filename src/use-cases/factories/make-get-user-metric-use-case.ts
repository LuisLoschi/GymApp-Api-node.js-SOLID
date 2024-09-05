import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { GetUserMetricUseCase } from "../get-user-metricts"


export function makeGetUserMetricsUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository()
    const UseCase = new GetUserMetricUseCase(checkInsRepository)

    return UseCase
}