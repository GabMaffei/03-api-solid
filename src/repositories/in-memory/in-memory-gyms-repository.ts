import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym, Prisma } from 'generated/prisma'
import { randomUUID } from 'node:crypto'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async create(data: Prisma.GymCreateInput) {
    const gym: Gym = {
      id: randomUUID(),
      title: data.title,
      description: data.description || null,
      phone: data.phone || null,
      latitude:
        data.latitude instanceof Prisma.Decimal
          ? data.latitude
          : new Prisma.Decimal(
              typeof data.latitude === 'object'
                ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  String((data.latitude as any).toString())
                : data.latitude,
            ),
      longitude:
        data.longitude instanceof Prisma.Decimal
          ? data.longitude
          : new Prisma.Decimal(
              typeof data.longitude === 'object'
                ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  String((data.longitude as any).toString())
                : data.longitude,
            ),
    }

    this.items.push(gym)

    return gym
  }

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)
    return gym || null
  }
}
