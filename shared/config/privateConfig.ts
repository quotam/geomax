import { z } from 'zod'

const privateConfigSchema = z.object({
	GOOGLE_CLIENT_ID: z.string(),
	GOOGLE_SECRET: z.string(),
	ADMIN_EMAILS: z.string().optional(),
	MAILER: z.object({
		host: z.string(),
		port: z.number(),
		secure: z.boolean(),
		auth: z.object({
			user: z.string(),
			pass: z.string()
		})
	}),
	NEXTAUTH_URL: z.string(),
	S3_ACCESS_KEY_ID: z.string(),
	S3_SECRET_ACCESS_KEY: z.string(),
	S3_IMAGES_BUCKET: z.string(),
	S3_ENDPOINT: z.string(),
	S3_REGION: z.string()
})

export const privateConfig = privateConfigSchema.parse({
	...process.env,
	MAILER: JSON.parse(process.env.MAILER!)
})
