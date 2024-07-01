import { File, Prisma } from '@prisma/client'

export interface FilesRepository {
  findById(id: string): Promise<File | null>
  create(data: Prisma.FileUncheckedCreateInput): Promise<File>
}
