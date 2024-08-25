import { UserRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundedError } from "./errors/resourse-not-founded";

interface GetUserProfileUseCaseRequest {
    userId: string
}

interface GetUserProfileUseCaseResponse {
    user: User
}

export class GetUserProfileUseCase {
    constructor(
        private userRepository: UserRepository
    ) {}

    async execute({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
        const user= await this.userRepository.findById(userId)

        if(!user) {
            throw new ResourceNotFoundedError()
        }

        return {
            user,
        }
    }
}