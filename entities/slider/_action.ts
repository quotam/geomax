'use server'

import { getAppSessionStrictServer } from '@front/kernel/lib/next-auth/getAppSessionStrictServer'
import { schemaParse } from '@front/kernel/lib/zod/shemaParse'
import { AccessDeniedError } from '@front/shared/lib/errors'

import { sliderAbility } from './_ability'
import { SliderUpdateDto, SliderUpdateSchema } from './_domain'
import { sliderService } from './_service'

export const sliderUpdateAction = async (dto: SliderUpdateDto) => {
	const session = await getAppSessionStrictServer()

	if (sliderAbility(session).canUpdate()) {
		const result = schemaParse(SliderUpdateSchema, dto)
		return await sliderService.update(result)
	}

	throw new AccessDeniedError('Недостаточно прав для обновления')
}

export const sliderCreateAction = async () => {
	const session = await getAppSessionStrictServer()

	if (sliderAbility(session).canCrete()) {
		return await sliderService.create(session.user.id)
	}

	throw new AccessDeniedError('Недостаточно прав для создания')
}

export const sliderDeleteAction = async (id: string) => {
	const session = await getAppSessionStrictServer()

	if (sliderAbility(session).canDelete()) {
		return await sliderService.delete(id)
	}

	throw new AccessDeniedError('Недостаточно прав для удаления')
}

export const sliderGetOneAction = async (id: string) => {
	const session = await getAppSessionStrictServer()

	if (sliderAbility(session).canViewAll()) {
		return await sliderService.getOne(id)
	}

	throw new AccessDeniedError('Недостаточно прав для просмотра')
}

export const sliderGetAllAction = async () => {
	return await sliderService.getAll()
}

export const sliderGetAllAdminAction = async () => {
	const session = await getAppSessionStrictServer()

	if (sliderAbility(session).canDelete()) {
		return await sliderService.getAllAdmin()
	}

	throw new AccessDeniedError('Недостаточно прав для просмотра')
}
