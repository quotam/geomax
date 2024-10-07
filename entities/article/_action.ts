'use server'

import { ArticleType } from '@prisma/client'
import { articleService } from './_service'
import { getAppSessionStrictServer } from '@front/kernel/lib/next-auth/getAppSessionStrictServer'
import { articleAbility } from './_ability'
import { AccessErrorError } from '@front/shared/lib/errors'
import { ArticleUpdateDto, ArticleUpdateSchema } from './_domain/dto'
import { schemaParse } from '@front/kernel/lib/zod/shemaParse'

export const ArticleGetAllAdminAction = async (type: ArticleType) => {
	const session = await getAppSessionStrictServer()
	if (articleAbility(session).canViewAll()) {
		return await articleService(type).getAllAdmin()
	}
	throw new AccessErrorError('Недостаточно прав для просмотра')
}

export const ArticleGetOneAction = async (type: ArticleType, id: string) => {
	const session = await getAppSessionStrictServer()
	if (articleAbility(session).canViewAll()) {
		return await articleService(type).getOne(id)
	}
	throw new AccessErrorError('Недостаточно прав для просмотра')
}

export const ArticleUpdateAdminAction = async (
	type: ArticleType,
	dto: ArticleUpdateDto
) => {
	const session = await getAppSessionStrictServer()
	console.log(dto)
	if (articleAbility(session).canUpdate()) {
		const result = schemaParse(ArticleUpdateSchema, dto)
		return await articleService(type).update(result)
	}
	throw new AccessErrorError('Недостаточно прав для обновления')
}

export const ArticleDeleteAdminAction = async (
	type: ArticleType,
	id: string
) => {
	const session = await getAppSessionStrictServer()
	if (articleAbility(session).canDelete()) {
		return await articleService(type).delete(id)
	}
	throw new AccessErrorError('Недостаточно прав для удаления')
}

export const ArticleCreateAdminAction = async (type: ArticleType) => {
	const session = await getAppSessionStrictServer()
	if (articleAbility(session).canCrete()) {
		return await articleService(type).create(session.user.id)
	}
	throw new AccessErrorError('Недостаточно прав для создания')
}
