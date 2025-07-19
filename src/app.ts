import fastify from 'fastify'
import { PrismaClient } from '../generated/prisma/client'

export const app = fastify()

const prisma = new PrismaClient()

prisma.user.create({
  data: {
    name: 'Diego Fernandes',
    email: 'diego@rocketseat.com.br',
    password_hash: 'hashed_password',
  },
})
