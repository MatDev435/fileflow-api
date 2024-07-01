import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { InMemoryFilesRepository } from '@/repositories/in-memory/in-memory-files-repository'
import { CreateSignedURLUseCase } from './create-signed-url'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryFilesRepository: InMemoryFilesRepository
let sut: CreateSignedURLUseCase

describe('Create Signed URL Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryFilesRepository = new InMemoryFilesRepository()
    sut = new CreateSignedURLUseCase(
      inMemoryUsersRepository,
      inMemoryFilesRepository,
    )
  })

  it('should be able to create a signed url', async () => {
    const user = await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 8),
    })

    const { signedUrl } = await sut.execute({
      userId: user.id,
      name: 'File name',
      contentType: 'video/mp4',
      size: 2048,
    })

    expect(signedUrl).toEqual(expect.any(String))
  })
})
