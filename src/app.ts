import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
  console.error(error)

  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'prod') {
    console.error('Unexpected error:', error)
  } else {
    // TODO: Here we should log the error to an external service
    // like DataDog, Sentry or LogRocket for production environments.
    // This is a placeholder for that logic.
  }

  reply.status(500).send({ message: 'Internal server error' })
})
