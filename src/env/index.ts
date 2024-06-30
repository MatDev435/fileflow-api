import { z } from 'zod'

const envSchema = z.object({
  CLOUDFLARE_ACCOUNT_TOKEN: z.string(),
  CLOUDFLARE_BUCKET_NAME: z.string(),
  CLOUDFLARE_ACCESS_KEY_ID: z.string(),
  CLOUDFLARE_ACCESS_KEY_SECRET: z.string(),
  PORT: z.coerce.number().optional().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables.', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
