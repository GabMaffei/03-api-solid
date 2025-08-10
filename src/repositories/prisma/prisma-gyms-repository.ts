import { Gym, Prisma } from 'generated/prisma'
import { prisma } from '@/lib/prisma'
import {
  FindManyNearbyParams,
  GymsRepository,
} from '@/repositories/gyms-repository'

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string) {
    return prisma.gym.findUnique({
      where: {
        id,
      },
    })
  }

  async create(data: Prisma.GymUncheckedCreateInput) {
    return prisma.gym.create({
      data,
    })
  }

  async searchMany(query: string, page: number = 1) {
    return prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
        SELECT * FROM gyms
        WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return gyms
  }
}
