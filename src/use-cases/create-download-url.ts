import { UsersRepository } from '@/repositories/users-repository'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { r2 } from '@/lib/cloudflare'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { FilesRepository } from '@/repositories/files-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { NotAllowedError } from './errors/not-allowed'
import { env } from '@/env'

interface CreateDownloadURLUseCaseRequest {
  userId: string
  fileId: string
}

interface CreateDownloadURLUseCaseResponse {
  signedUrl: string
}

export class CreateDownloadURLUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private filesRepository: FilesRepository,
  ) {}

  async execute({
    userId,
    fileId,
  }: CreateDownloadURLUseCaseRequest): Promise<CreateDownloadURLUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const file = await this.filesRepository.findById(fileId)

    if (!file) {
      throw new ResourceNotFoundError()
    }

    if (file.userId !== userId) {
      throw new NotAllowedError()
    }

    const signedUrl = await getSignedUrl(
      r2,
      new GetObjectCommand({
        Bucket: env.CLOUDFLARE_BUCKET_NAME,
        Key: file.key,
      }),
      { expiresIn: 600 },
    )

    return { signedUrl }
  }
}
