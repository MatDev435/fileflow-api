import { UsersRepository } from '@/repositories/users-repository'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { r2 } from '@/lib/cloudflare'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { randomUUID } from 'crypto'
import { FilesRepository } from '@/repositories/files-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface CreateSignedURLUseCaseRequest {
  userId: string
  name: string
  contentType: string
  size: number
}

interface CreateSignedURLUseCaseResponse {
  signedUrl: string
}

export class CreateSignedURLUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private filesRepository: FilesRepository,
  ) {}

  async execute({
    userId,
    name,
    contentType,
    size,
  }: CreateSignedURLUseCaseRequest): Promise<CreateSignedURLUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const fileKey = `${name}-${randomUUID}`

    const signedUrl = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: 'fileflow-dev',
        Key: fileKey,
        ContentType: contentType,
      }),
    )

    await this.filesRepository.create({
      userId,
      name,
      key: fileKey,
      contentType,
      size,
    })

    return { signedUrl }
  }
}
