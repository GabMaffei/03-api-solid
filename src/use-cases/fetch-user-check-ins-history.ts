import { CheckIn } from 'generated/prisma'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface FetchUserCheckInsUseCaseRequest {
  userId: string
  page?: number
}

interface FetchUserCheckInsUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsUseCaseRequest): Promise<FetchUserCheckInsUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    if (!checkIns) {
      throw new ResourceNotFoundError('Check-ins not found')
    }

    return {
      checkIns,
    }
  }
}
