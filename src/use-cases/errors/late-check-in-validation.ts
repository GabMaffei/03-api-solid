export class LateCheckInValidationError extends Error {
  constructor() {
    super('Check-in validation expired')
    this.name = 'LateCheckInValidationError'
  }
}
