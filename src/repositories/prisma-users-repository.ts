import { prisma } from '@/lib/prisma'
import { Prisma } from 'generated/prisma'

export class PrismaUsersRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    })
  }

  async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data,
    })
  }
}
