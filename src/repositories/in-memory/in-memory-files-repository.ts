import { File, Prisma } from '@prisma/client'
import { FilesRepository } from '../files-repository'

export class InMemoryFilesRepository implements FilesRepository {
  public items: File[] = []

  async findById(id: string): Promise<File | null> {
    const file = this.items.find((item) => item.id === id)

    if (!file) {
      return null
    }

    return file
  }

  async create(data: Prisma.FileUncheckedCreateInput): Promise<File> {
    const file = {
      id: data.id,
      name: data.name,
      key: data.key,
      contentType: data.contentType,
      size: data.size,
      createdAt: new Date(),
    } as File

    this.items.push(file)

    return file
  }
}
