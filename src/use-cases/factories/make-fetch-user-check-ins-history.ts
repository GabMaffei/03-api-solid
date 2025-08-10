import { FetchUserCheckInsUseCase } from '../fetch-user-check-ins-history'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-checkin-repository'

export function makeFetchUserCheckInsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  return new FetchUserCheckInsUseCase(checkInsRepository)
}
