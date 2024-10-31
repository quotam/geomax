'use server'

import { getAppSessionStrictServer } from '@front/kernel/lib/next-auth/getAppSessionStrictServer'
import { fileStorage } from '@front/kernel/lib/s3/fileStorage'
import { AccessDeniedError, BadRequestError } from '@front/shared/lib/errors'

import { editorAbility } from '../_ability'
import { IMAGE_KEY as FILE_KEY } from '../domain'

export const uploadStorageFile = async (data: FormData) => {
	const session = await getAppSessionStrictServer()

	if (editorAbility(session).canUploadFile()) {
		const file = data.get(FILE_KEY)
		if (!(file instanceof File)) throw new BadRequestError()

		const stored = await fileStorage.uploadImage(file, FILE_KEY)
		return stored.path
	}

	throw new AccessDeniedError('Недостаточно прав для загрузки file')
}
