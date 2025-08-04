import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym, Prisma } from 'generated/prisma'
import { randomUUID } from 'node:crypto'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async create(data: Prisma.GymCreateInput) {
    const gym: Gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description || null,
      phone: data.phone || null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    }

    this.items.push(gym)

    return gym
  }

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)
    return gym || null
  }

  async searchMany(query: string, page: number = 1): Promise<Gym[]> {
    const itemsPerPage = 20

    return this.items
      .filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
      .slice((page - 1) * itemsPerPage, page * itemsPerPage)
  }
}
