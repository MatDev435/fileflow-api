import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaFilesRepository } from '@/repositories/prisma/prisma-files-repository'
import { CreateDownloadURLUseCase } from '../create-download-url'

export function makeCreateDownloadUrl() {
  const usersRepository = new PrismaUsersRepository()
  const filesRepository = new PrismaFilesRepository()
  const useCase = new CreateDownloadURLUseCase(usersRepository, filesRepository)

  return useCase
}
