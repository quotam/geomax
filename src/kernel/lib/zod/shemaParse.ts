import { BadRequestError } from '@front/shared/lib/errors'
import { ZodSchema } from 'zod'

export function schemaParse<T>(schema: ZodSchema<T>, data: unknown): T {
	try {
		return schema.parse(data)
	} catch (e) {
		console.error(e)
		throw new BadRequestError()
	}
}
