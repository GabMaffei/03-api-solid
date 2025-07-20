import { expect, it, describe, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'
import { UsersRepository } from '@/repositories/users-repository'

let usersRepository: UsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })
  it('should hash the user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'securepassword',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash the user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'securepassword',
    })

    const isPasswordCorrectlyHashed = await compare(
      'securepassword',
      user.password_hash,
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'john.doe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: 'securepassword',
    })

    await expect(
      sut.execute({
        name: 'John Doe',
        email,
        password: 'securepassword',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
