import cacheStrategy from '@front/kernel/lib/cache-strategy'
import dbClient from '@front/shared/lib/dbClient'
import { productEntity } from './_entity'
import { ProductStatus } from '@prisma/client'
import { userEntity } from '../user/_domain/entities'
import { UpdateProductDto } from './_domain'

const serviceTag = 'product'

class ProductService {
	cacheTags = {
		list: serviceTag,
		once: (id: string) => id + serviceTag
	}

	async createFacturer(title: string) {
		return await dbClient.facturer.create({
			data: {
				title
			},
			select: { id: true, title: true }
		})
	}
	async deleteFacturer(id: string) {
		return await dbClient.facturer.delete({
			where: {
				id
			},
			select: {
				title: true
			}
		})
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
		return await dbClient.productCategory.create({
			data: {
				title
			},
			select: { id: true, title: true }
		})
	}

	async deleteCategory(id: string) {
		return await dbClient.productCategory.delete({
			where: {
				id
			},
			select: {
				title: true
			}
		})
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
		cacheStrategy.invalidate(this.cacheTags.list)
		cacheStrategy.invalidate(this.cacheTags.once(id))
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
		return await cacheStrategy.fetch([this.cacheTags.list], () =>
			dbClient.product.findMany({
				where: {
					status: ProductStatus.PUBLISHED
				},
				select: productEntity.list
			})
		)
	}

	async getOnce(id: string) {
		return await cacheStrategy.fetch([this.cacheTags.once(id)], () =>
			dbClient.product.findUnique({
				where: { id },
				select: productEntity.once
			})
		)
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

		cacheStrategy.invalidate(this.cacheTags.list)
		cacheStrategy.invalidate(this.cacheTags.once(id))
		return id
	}

	async delete(id: string) {
		await dbClient.product.delete({
			where: {
				id
			}
		})
		cacheStrategy.invalidate(this.cacheTags.list)
		cacheStrategy.invalidate(this.cacheTags.once(id))
		return id
	}
}

export const productService = new ProductService()
