'use server'

import { getAppSessionStrictServer } from '@front/kernel/lib/next-auth/getAppSessionStrictServer'
import { AccessErrorError } from '@front/shared/lib/errors'
import { sliderAbility } from './_ability'
import { sliderService } from './_service'

export const sliderCreateAction = async () => {
	const session = await getAppSessionStrictServer()

	if (sliderAbility(session).canCrete()) {
		return await sliderService.create(session.user.id)
	}

	throw new AccessErrorError('Недостаточно прав для создания')
}

export const sliderDeleteAction = async (id: string) => {
	const session = await getAppSessionStrictServer()

	if (sliderAbility(session).canDelete()) {
		return await sliderService.delete(id)
	}

	throw new AccessErrorError('Недостаточно прав для удаления')
}

export const sliderGetOneAction = async (id: string) => {
	return await sliderService.getOne(id)
}

export const sliderGetAllAction = async () => {
	return await sliderService.getAll()
}

export const sliderGetAllAdminAction = async () => {
	const session = await getAppSessionStrictServer()

	if (sliderAbility(session).canDelete()) {
		return await sliderService.getAllAdmin()
	}

	throw new AccessErrorError('Недостаточно прав для просмотра')
}
