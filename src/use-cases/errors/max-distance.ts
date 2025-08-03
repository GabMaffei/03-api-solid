export class MaxDistanceError extends Error {
  constructor(description: string) {
    super(`${description}. Max distance exceeded.`)
    this.name = 'MaxDistanceError'
  }
}
