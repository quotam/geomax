'use server'

import { fileStorage } from '@front/kernel/lib/s3/fileStorage'
import { BadRequestError } from '@front/shared/lib/errors'
import { IMAGE_KEY } from '../domain'

export const uploadProfileImage = async (data: FormData) => {
	const file = data.get(IMAGE_KEY)

	if (!(file instanceof File)) {
		throw new BadRequestError()
	}

	const stored = await fileStorage.uploadImage(file, IMAGE_KEY)

	return stored.path
}
