import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUserUseCase } from '../register-user'

export function makeRegisterUser() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new RegisterUserUseCase(usersRepository)

  return useCase
}
