import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "@/repositories/check-in-repository";
import { GymRepository } from "@/repositories/gym-repository";
import { ResourceNotFoundedError } from "./errors/resourse-not-founded";

interface CheckInUseCaseRequest {
    userId: string
    gymId: string
    userLatitude: number
    userLongitude: number
}

interface CheckInUseCaseResponse {
    checkin: CheckIn
}

export class CheckInUseCase {
    constructor(
        private checkInRepository: CheckInRepository,
        private  gymRepository: GymRepository
    ) {}

    async execute({ userId, gymId }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const gym = await this.gymRepository.findById(gymId)

        if (!gym) {
            throw new ResourceNotFoundedError()
        }
        
        const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(
            userId,
            new Date()
        )

        if(checkInOnSameDay) {
            throw new Error()
        }


        const checkin = await this.checkInRepository.create({
            gym_id: gymId,
            user_id: userId
        })


        return {
            checkin,
        }
    }
}