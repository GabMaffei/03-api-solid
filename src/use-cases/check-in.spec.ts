import { expect, it, describe, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins'
import { MaxDistanceError } from './errors/max-distance'

let checkInsRepository: CheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.create({
      id: 'gym-01',
      title: 'Javascript Gym',
      description: 'Academia de musculação',
      latitude: -27.2892052,
      longitude: -49.6401091,
      phone: '123456789',
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -27.2892052,
      userLongitude: -49.6401091,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -27.2892052,
      userLongitude: -49.6401091,
    })

    await expect(
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: -27.2892052,
        userLongitude: -49.6401091,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -27.2892052,
      userLongitude: -49.6401091,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    await expect(
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: -27.2892052,
        userLongitude: -49.6401091,
      }),
    ).resolves.toBeTruthy()
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.create({
      id: 'gym-02',
      title: 'Typescript Gym',
      description: 'Academia de musculação',
      latitude: -27.0747279,
      longitude: -49.4889672,
      phone: '123456789',
    })

    await expect(
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-02',
        userLatitude: -27.2892052,
        userLongitude: -49.6401091,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
