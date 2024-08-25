import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "@/repositories/check-in-repository";

interface CheckInUseCaseRequest {
    userId: string
    gymId: string
}

interface CheckInUseCaseResponse {
    checkin: CheckIn
}

export class CheckInUseCase {
    constructor(
        private checkInRepository: CheckInRepository
    ) {}

    async execute({ userId, gymId }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const checkin = await this.checkInRepository.create({
            gym_id: gymId,
            user_id: userId
        })


        return {
            checkin,
        }
    }
}