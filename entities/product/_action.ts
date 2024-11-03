'use server'

import { getAppSessionStrictServer } from '@front/kernel/lib/next-auth/getAppSessionStrictServer'
import { schemaParse } from '@front/kernel/lib/zod/shemaParse'
import { AccessDeniedError } from '@front/shared/lib/errors'

import { productAbility } from './_ability'
import { UpdateProdcutSchema, UpdateProductDto } from './_domain'
import { productService } from './_service'

export const ProductGetAdminFactureres = async () => {
	const session = await getAppSessionStrictServer()
	if (productAbility(session).canViewAll()) {
		return await productService.getAdminFactureres()
	}
	throw new AccessDeniedError('Недостаточно прав для просмотра')
}

export const ProductDeleteFacturerAdminAction = async (id: string) => {
	const session = await getAppSessionStrictServer()
	if (productAbility(session).canDelete()) {
		return await productService.deleteFacturer(id)
	}
	throw new AccessDeniedError('Недостаточно прав для удаления')
}

export const ProductCteateFacturerAction = async (title: string) => {
	const session = await getAppSessionStrictServer()
	if (productAbility(session).canCrete()) {
		return await productService.createFacturer(title)
	}
	throw new AccessDeniedError('Недостаточно прав для создания')
}

export const ProductGetAdminCategoryes = async () => {
	const session = await getAppSessionStrictServer()
	if (productAbility(session).canViewAll()) {
		return await productService.getAdminCategoryes()
	}
	throw new AccessDeniedError('Недостаточно прав для просмотра')
}

export const ProductDeleteCategoryAdminAction = async (id: string) => {
	const session = await getAppSessionStrictServer()
	if (productAbility(session).canDelete()) {
		return await productService.deleteCategory(id)
	}
	throw new AccessDeniedError('Недостаточно прав для удаления')
}

export const ProductCteateCategoryAction = async (title: string) => {
	const session = await getAppSessionStrictServer()
	if (productAbility(session).canCrete()) {
		return await productService.createCategory(title)
	}
	throw new AccessDeniedError('Недостаточно прав для создания')
}

export const ProductAdminGetAllAction = async () => {
	const session = await getAppSessionStrictServer()
	if (productAbility(session).canViewAll()) {
		return await productService.getAllAdmin()
	}
	throw new AccessDeniedError()
}

export const ProductGetOnceAdminQuery = async (id: string) => {
	const session = await getAppSessionStrictServer()
	if (productAbility(session).canViewAll()) {
		return await productService.getOnceAdmin(id)
	}
	throw new AccessDeniedError()
}

export const ProductGetOnceQuery = async (id: string) => {
	return await productService.getOnce(id)
}

export const ProductUpdateAction = async (dto: UpdateProductDto) => {
	const session = await getAppSessionStrictServer()
	if (productAbility(session).canUpdate()) {
		const result = schemaParse(UpdateProdcutSchema, dto)
		return await productService.update(result)
	}
	throw new AccessDeniedError()
}

export const PoductCreateAction = async () => {
	const session = await getAppSessionStrictServer()
	if (productAbility(session).canCrete()) {
		return await productService.create(session.user.id)
	}
	throw new AccessDeniedError()
}

export const ProductDeleteAction = async (id: string) => {
	const session = await getAppSessionStrictServer()
	if (productAbility(session).canDelete()) {
		return await productService.delete(id)
	}
	throw new AccessDeniedError()
}
