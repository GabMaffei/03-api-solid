import { UsersRepository } from '@/repositories/users-repository'
import { User, Prisma } from 'generated/prisma'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: 'user-id',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)
    return user || null
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)
    return user || null
  }
}
