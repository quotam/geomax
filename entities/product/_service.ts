import dbClient from '@front/shared/lib/dbClient'
import { ProductStatus } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import { userEntity } from '../user/_domain/entities'
import { UpdateProductDto } from './_domain'
import { productEntity } from './_entity'

function invalidate(id?: string) {
	revalidatePath('/')
	revalidatePath('catalog/')
	if (id) revalidatePath(`/catalog/${id}`)
}

class ProductService {
	getCategories() {
		return dbClient.productCategory.findMany({
			select: {
				id: true,
				title: true,
				desc: true
			},
			where: {
				Product: {
					some: {}
				}
			}
		})
	}

	async createFacturer(title: string) {
		const data = await dbClient.facturer.create({
			data: {
				title
			},
			select: { id: true, title: true }
		})
		invalidate()
		return data
	}

	async deleteFacturer(id: string) {
		const data = await dbClient.facturer.delete({
			where: {
				id
			},
			select: {
				title: true
			}
		})
		invalidate()
		return data
	}
	async getAdminFactureres() {
		return dbClient.facturer.findMany({
			select: {
				id: true,
				title: true
			}
		})
	}
	async createCategory(title: string) {
		const data = title.split('&')
		const cat = await dbClient.productCategory.create({
			data: {
				title: data[0],
				desc: data[1] || ''
			},
			select: { id: true, title: true }
		})
		invalidate()
		return cat
	}

	async deleteCategory(id: string) {
		const cat = await dbClient.productCategory.delete({
			where: {
				id
			},
			select: {
				title: true
			}
		})
		invalidate()
		return cat
	}

	async getAdminCategoryes() {
		return dbClient.productCategory.findMany({
			select: {
				id: true,
				title: true
			}
		})
	}

	async update(dto: UpdateProductDto) {
		const { categoryId, facturerId, ...data } = dto
		const { id } = await dbClient.product.update({
			where: {
				id: data.id
			},
			data: { ...data, categoryID: categoryId, facturerID: facturerId },
			select: { id: true }
		})
		invalidate(id)
		return id
	}

	async getAllAdmin() {
		return await dbClient.product.findMany({
			select: {
				...productEntity.list,
				createdAt: true,
				updatedAt: true,
				user: {
					select: userEntity.fullUser
				}
			}
		})
	}
	async getAll() {
		return await dbClient.product.findMany({
			where: {
				status: ProductStatus.PUBLISHED
			},
			select: productEntity.list
		})
	}

	async getOnceAdmin(id: string) {
		return await dbClient.product.findUnique({
			where: { id },
			select: productEntity.once
		})
	}

	async getOnce(id: string) {
		return await dbClient.product.findUnique({
			where: { id, status: ProductStatus.PUBLISHED },
			select: productEntity.once
		})
	}

	async create(userID: string) {
		const { id } = await dbClient.product.create({
			data: {
				title: '',
				meta: '',
				body: '',
				userID
			},
			select: {
				id: true
			}
		})

		return id
	}

	async delete(id: string) {
		await dbClient.product.delete({
			where: {
				id
			}
		})
		invalidate(id)
		return id
	}
	async getSearchParams() {
		const categories = await dbClient.productCategory.findMany({
			where: {
				Product: {
					some: {}
				}
			},
			select: {
				id: true,
				title: true
			}
		})
		const facturers = await dbClient.facturer.findMany({
			where: {
				Product: {
					some: {}
				}
			},
			select: {
				id: true,
				title: true
			}
		})
		return { categories, facturers }
	}
}

export const productService = new ProductService()
