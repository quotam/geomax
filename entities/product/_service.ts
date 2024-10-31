import cacheStrategy from '@front/kernel/lib/cache-strategy'
import dbClient from '@front/shared/lib/dbClient'
import { ProductStatus } from '@prisma/client'

import { userEntity } from '../user/_domain/entities'
import { UpdateProductDto } from './_domain'
import { productEntity } from './_entity'

const serviceTag = 'product'

class ProductService {
	cacheTags = {
		list: serviceTag,
		once: (id: string) => id + serviceTag,
		category: serviceTag + 'cat',
		search: serviceTag + 'search'
	}

	getCategories() {
		return cacheStrategy.fetch([this.cacheTags.category], () =>
			dbClient.productCategory.findMany({
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
		)
	}

	async createFacturer(title: string) {
		const data = await dbClient.facturer.create({
			data: {
				title
			},
			select: { id: true, title: true }
		})

		cacheStrategy.invalidate(this.cacheTags.search)
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

		cacheStrategy.invalidate(this.cacheTags.search)
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
		cacheStrategy.invalidate(this.cacheTags.category)
		cacheStrategy.invalidate(this.cacheTags.search)
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
		cacheStrategy.invalidate(this.cacheTags.category)
		cacheStrategy.invalidate(this.cacheTags.search)
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
		cacheStrategy.invalidate(this.cacheTags.list)
		cacheStrategy.invalidate(this.cacheTags.category)
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
		cacheStrategy.invalidate(this.cacheTags.search)
		cacheStrategy.invalidate(this.cacheTags.once(id))
		return id
	}
	async getSearchParams() {
		return await cacheStrategy.fetch([this.cacheTags.search], async () => {
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
		})
	}
}

export const productService = new ProductService()
