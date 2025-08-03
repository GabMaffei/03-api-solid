import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: GymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })
  it('should create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'Gym A',
      description: 'A nice gym',
      phone: '123456789',
      latitude: 1.234,
      longitude: 5.678,
    })

    expect(gym.id).toEqual(expect.any(String))
  })

  //   it('should not be able to create a gym with same title twice', async () => {
  //     const title = 'Gym A'

  //     await sut.execute({
  //       title,
  //       description: 'A nice gym',
  //       phone: '123456789',
  //       latitude: 1.234,
  //       longitude: 5.678,
  //     })

  //     await expect(
  //       sut.execute({
  //         title,
  //         description: 'A nice gym',
  //         phone: '123456789',
  //         latitude: 1.234,
  //         longitude: 5.678,
  //       }),
  //     ).rejects.toBeInstanceOf(GymAlreadyExistsError)
  //   })
})
