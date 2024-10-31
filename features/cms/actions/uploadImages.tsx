'use server'

import { editorAbility } from '@front/entities/editor/_ability'
import { IMAGE_KEY } from '@front/entities/editor/domain'
import { getAppSessionStrictServer } from '@front/kernel/lib/next-auth/getAppSessionStrictServer'
import { fileStorage } from '@front/kernel/lib/s3/fileStorage'
import { AccessDeniedError } from '@front/shared/lib/errors'

export const UploadimagesAction = async (data: FormData) => {
	const session = await getAppSessionStrictServer()

	if (editorAbility(session).canUploadFile()) {
		let stored: string[] = []
		//@ts-ignore
		for (let [key, value] of data.entries()) {
			const file = data.get(key)
			if (file instanceof File) {
				stored.push(await fileStorage.uploadImage(file, IMAGE_KEY).then(res => res.path))
			}
		}
		return stored
	}
	throw new AccessDeniedError('Недостаточно прав для загрузки file')
}
