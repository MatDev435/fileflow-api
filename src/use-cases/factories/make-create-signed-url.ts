import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateSignedURLUseCase } from '../create-signed-url'
import { PrismaFilesRepository } from '@/repositories/prisma/prisma-files-repository'

export function makeCreateSignedUrl() {
  const usersRepository = new PrismaUsersRepository()
  const filesRepository = new PrismaFilesRepository()
  const useCase = new CreateSignedURLUseCase(usersRepository, filesRepository)

  return useCase
}
