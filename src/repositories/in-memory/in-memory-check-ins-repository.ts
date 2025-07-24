import { CheckIn, Prisma } from 'generated/prisma'
import { CheckInsRepository } from '../check-ins-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn: CheckIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    }

    this.items.push(checkIn)

    return checkIn
  }

  async findById(id: string) {
    const checkIn = this.items.find((item) => item.id === id)
    return checkIn || null
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const checkIn = this.items.find(
      (item) =>
        item.user_id === userId &&
        item.created_at.toDateString() === date.toDateString(),
    )
    return checkIn || null
  }
}
