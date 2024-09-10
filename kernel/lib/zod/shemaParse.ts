import { BadRequestError } from '@front/shared/lib/errors'

export function schemaParse<T>(schema: any, data: T): T {
	try {
		return schema.parse(data)
	} catch (e) {
		throw new BadRequestError()
	}
}
