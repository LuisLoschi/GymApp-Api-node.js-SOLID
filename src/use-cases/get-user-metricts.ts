import { CheckInRepository } from "@/repositories/check-in-repository";


interface GetUserMetricUseCaseRequest {
    userId: string
}

interface GetUserMetricUseCaseResponse {
    checkInsCount: number
}

export class GetUserMetricUseCase {
    constructor(
        private checkInsRepository: CheckInRepository
    ) {}

    async execute({ userId }: GetUserMetricUseCaseRequest): Promise<GetUserMetricUseCaseResponse> {
        const checkInsCount = await this.checkInsRepository.countByUserId(userId)

        return {
            checkInsCount,
        }
    }
}