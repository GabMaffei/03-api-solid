import { expect, it, describe, beforeEach } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'
import { GymsRepository } from '@/repositories/gyms-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: GymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -23.5505,
      longitude: -46.6333,
    })

    await gymsRepository.create({
      title: 'TypeScript Gym',
      description: '',
      phone: '',
      latitude: -23.5505,
      longitude: -46.6333,
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript',
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
  })

  it('should be able to fetch paginated gyms search results', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Gym ${i}`,
        description: '',
        phone: '',
        latitude: -23.5505,
        longitude: -46.6333,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Gym',
      page: 2,
    })

    console.log(gyms)

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym 21' }),
      expect.objectContaining({ title: 'Gym 22' }),
    ])
  })
})
