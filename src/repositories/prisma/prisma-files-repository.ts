import { File, Prisma } from '@prisma/client'
import { FilesRepository } from '../files-repository'
import { prisma } from '@/lib/prisma'

export class PrismaFilesRepository implements FilesRepository {
  async findById(id: string): Promise<File | null> {
    const file = await prisma.file.findUnique({
      where: {
        id,
      },
    })

    return file
  }

  async create(data: Prisma.FileUncheckedCreateInput): Promise<File> {
    const file = await prisma.file.create({
      data,
    })

    return file
  }
}
