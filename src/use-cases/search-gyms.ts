import { Gym } from '@prisma/client'
import { GymRepository } from '@/repositories/gym-repository'

interface SearchGymsUseCaseRequest {
    search: string
    page: number
}

interface SearchGymsUseCaseResponse {
    gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymRepository: GymRepository){}

  async execute({ search, page }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
  
    const gyms = await this.gymRepository.searchManygyms(search, page)

    return {
      gyms
    }
  }
}

