import { makeRegisterUser } from '@/use-cases/factories/make-register-user'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  const registerUser = makeRegisterUser()

  await registerUser.execute({
    name,
    email,
    password,
  })

  return reply.status(201).send()
}
