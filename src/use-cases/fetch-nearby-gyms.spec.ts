import { expect, it, describe, beforeEach } from 'vitest'
import { GymsRepository } from '@/repositories/gyms-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: GymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -27.2892052,
      longitude: -49.6401091,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -27.8618928,
      longitude: -49.5229501,
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.2892052,
      userLongitude: -49.6401091,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })

  it.todo('should be able to fetch paginated gyms search results', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Gym ${i}`,
        description: '',
        phone: '',
        latitude: -23.5505,
        longitude: -46.6333,
      })
    }

    // const { gyms } = await sut.execute({
    //   query: 'Gym',
    //   page: 2,
    // })

    // console.log(gyms)

    // expect(gyms).toHaveLength(2)
    // expect(gyms).toEqual([
    //   expect.objectContaining({ title: 'Gym 21' }),
    //   expect.objectContaining({ title: 'Gym 22' }),
    // ])
  })
})
