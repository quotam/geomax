import { z } from 'zod'

const privateConfigSchema = z.object({
	METRIKA_ID: z.string(),
	LEAD_CREATE_WEBHOOK: z.string(),
	MAILER: z.object({
		host: z.string(),
		port: z.number(),
		secure: z.boolean(),
		auth: z.object({
			user: z.string(),
			pass: z.string()
		})
	}),
	SITE_URL: z.string(),
	CONTENT_URL: z.string(),
	SECRET_TOKEN: z.string(),
	AUTH_TOKEN: z.string()
})

export const privateConfig = privateConfigSchema.parse({
	...process.env,
	MAILER: JSON.parse(process.env.MAILER!)
})
