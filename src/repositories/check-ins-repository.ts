import { CheckIn, Prisma } from 'generated/prisma'

export interface CheckInsRepository {
  findById(id: string): Promise<CheckIn | null>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
