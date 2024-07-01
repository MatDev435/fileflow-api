import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { InMemoryFilesRepository } from '@/repositories/in-memory/in-memory-files-repository'
import { CreateDownloadURLUseCase } from './create-download-url'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryFilesRepository: InMemoryFilesRepository
let sut: CreateDownloadURLUseCase

describe('Create Download URL Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryFilesRepository = new InMemoryFilesRepository()
    sut = new CreateDownloadURLUseCase(
      inMemoryUsersRepository,
      inMemoryFilesRepository,
    )
  })

  it('should be able to create a download url', async () => {
    const user = await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 8),
    })

    const file = await inMemoryFilesRepository.create({
      userId: user.id,
      name: 'File name',
      key: 'File name-key',
      contentType: 'video/mp4',
      size: 2048,
    })

    const { signedUrl } = await sut.execute({
      userId: user.id,
      fileId: file.id,
    })

    expect(signedUrl).toEqual(expect.any(String))
  })
})
