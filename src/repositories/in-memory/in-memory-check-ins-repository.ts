import { CheckIn, Prisma } from 'generated/prisma'
import { CheckInsRepository } from '../check-ins-repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'

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
    const startOfDay = dayjs(date).startOf('date').toDate()
    const endOfDay = dayjs(date).endOf('date').toDate()

    const checkIn = this.items.find(
      (item) =>
        item.user_id === userId &&
        item.created_at >= startOfDay &&
        item.created_at <= endOfDay,
    )
    return checkIn || null
  }

  async findManyByUserId(userId: string, page: number = 1) {
    const maxItemsPerPage = 20

    return this.items
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * maxItemsPerPage, page * maxItemsPerPage)
  }

  async countByUserId(userId: string) {
    return this.items.filter((item) => item.user_id === userId).length
  }

  async save(checkIn: CheckIn) {
    const index = this.items.findIndex((item) => item.id === checkIn.id)

    if (index >= 0) {
      this.items[index] = checkIn
      return checkIn
    }

    throw new ResourceNotFoundError('Check-in not found')
  }
}
