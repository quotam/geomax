import { userID } from '@front/kernel/domain/user'
import cacheStrategy from '@front/kernel/lib/cache-strategy'
import dbClient from '@front/shared/lib/dbClient'
import { ArticleStatus, ArticleType } from '@prisma/client'
import { ArticleUpdateDto } from './_domain/dto'
import { articleEntity } from './_domain/entity'

const serviceTag = 'article'

class ArticleService {
	constructor(private readonly _type: ArticleType) {}

	cacheTags = {
		list: serviceTag,
		once: (id: string) => id + serviceTag,
		preview: serviceTag + 'preview' + this._type
	}

	async prepareStatic() {
		return await dbClient.article.findMany({
			where: {
				status: ArticleStatus.PUBLISHED
			}
		})
	}

	async _getCatFiltered() {
		const withCategory = await dbClient.articleCategory.findMany({
			where: {
				type: this._type,
				Article: {
					some: {
						status: ArticleStatus.PUBLISHED
					}
				}
			},

			select: {
				id: true,
				title: true,
				Article: {
					select: {
						...articleEntity.clientView,
						category: false,
						body: false
					}
				}
			}
		})
		const withoutCategory = await dbClient.article.findMany({
			where: {
				type: this._type,
				category: {
					is: null
				}
			},
			select: {
				...articleEntity.clientView,
				category: false,
				body: false
			}
		})
		return [
			...withCategory.map(cat => ({
				category: {
					id: cat.id,
					title: cat.title
				},
				article: cat.Article
			})),
			...(withoutCategory.length
				? [
						{
							category: { id: 'withoutCategory', title: 'Без категории' },
							article: withoutCategory
						}
					]
				: [])
		]
	}

	async getCatFiltered() {
		return await cacheStrategy.fetch([this.cacheTags.list], () =>
			this._getCatFiltered()
		)
	}

	createCategory(title: string) {
		return dbClient.articleCategory.create({
			data: {
				title,
				type: this._type
			},
			select: {
				id: true,
				title: true
			}
		})
	}

	deleteCategory(id: string) {
		const data = dbClient.articleCategory.delete({
			where: {
				id
			},
			select: {
				title: true
			}
		})
		cacheStrategy.invalidate(this.cacheTags.list)
		return data
	}

	async getAdminCategoryes() {
		return await dbClient.articleCategory.findMany({
			where: {
				type: this._type
			},
			select: {
				id: true,
				title: true
			}
		})
	}
	getCount = () => {
		switch (this._type) {
			case 'NEWS':
				return 3
			case 'PROJECT':
				return 6
			default:
				return 5
		}
	}

	async getPreview() {
		return cacheStrategy.fetch([this.cacheTags.preview], () =>
			dbClient.article.findMany({
				take: this.getCount(),
				where: {
					type: this._type,
					status: ArticleStatus.PUBLISHED
				},
				select: articleEntity.clientView
			})
		)
	}

	async getAll() {
		return cacheStrategy.fetch([this.cacheTags.list], () =>
			dbClient.article.findMany({
				where: {
					type: this._type,
					status: ArticleStatus.PUBLISHED
				},
				select: articleEntity.clientView
			})
		)
	}

	async getAllAdmin() {
		return await dbClient.article.findMany({
			where: {
				type: this._type
			},
			select: articleEntity.adminView
		})
	}
	async getOne(id: string) {
		return await cacheStrategy.fetch([this.cacheTags.once(id)], () =>
			dbClient.article.findUnique({
				where: {
					id,
					type: this._type
				},
				select: {
					...articleEntity.clientView,
					image: true,
					status: true
				}
			})
		)
	}
	async getOneAdmin(id: string) {
		return await dbClient.article.findUnique({
			where: {
				id,
				type: this._type
			},
			select: {
				...articleEntity.clientView,
				image: true,
				status: true
			}
		})
	}

	async update(dto: ArticleUpdateDto) {
		const { id } = await dbClient.article.update({
			where: {
				id: dto.id
			},
			data: {
				title: dto.title,
				image: dto.image,
				status: dto.status,
				meta: dto.meta,
				desc: dto.desc,
				...(dto.categoryId && {
					articleCategoryId: dto.categoryId
				}),
				...(dto.body && {
					body: dto.body
				})
			}
		})
		cacheStrategy.invalidate(this.cacheTags.once(id))
		cacheStrategy.invalidate(this.cacheTags.list)
		cacheStrategy.invalidate(this.cacheTags.preview)
		return id
	}

	async create(userId: userID) {
		const { id } = await dbClient.article.create({
			data: {
				type: this._type,
				body: '',
				title: '',
				desc: '',
				meta: '',
				user: {
					connect: {
						id: userId
					}
				}
			},
			select: {
				id: true
			}
		})
		return id
	}

	async delete(id: string) {
		await dbClient.article.delete({
			where: {
				id
			}
		})

		cacheStrategy.invalidate(this.cacheTags.once(id))
		cacheStrategy.invalidate(this.cacheTags.list)
		cacheStrategy.invalidate(this.cacheTags.preview)
		return id
	}
}
export const articleService = (type: ArticleType) => new ArticleService(type)
