import { userID } from '@front/kernel/domain/user'
import cacheStrategy from '@front/kernel/lib/cache-strategy'
import dbClient from '@front/shared/lib/dbClient'
import { ArticleStatus, ArticleType } from '@prisma/client'
import { ArticleUpdateDto } from './_domain/dto'
import { articleEntity } from './_domain/entity'

const serviceTag = 'article'

class ArticleService {
	constructor(private readonly _type: ArticleType) {}

	async _getCatFiltered() {
		const withCategory = await dbClient.articleCategory.findMany({
			where: {
				type: this._type
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
				type: this._type
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
			{ category: { id: 'some', title: 'Разное' }, article: withoutCategory }
		]
	}

	async getCatFiltered() {
		return await cacheStrategy.fetch([serviceTag], () => this._getCatFiltered())
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
		return dbClient.articleCategory.delete({
			where: {
				id
			},
			select: {
				title: true
			}
		})
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
		return cacheStrategy.fetch([serviceTag], () =>
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
		return cacheStrategy.fetch([serviceTag], () =>
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
		return await cacheStrategy.fetch([serviceTag + id], () =>
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
				id
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
				body: dto.body,
				image: dto.image,
				status: dto.status,
				meta: dto.meta,
				desc: dto.desc,
				...(dto.categoryId && {
					articleCategoryId: dto.categoryId
				})
			}
		})
		cacheStrategy.invalidate(serviceTag)
		cacheStrategy.invalidate(serviceTag + id)
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

		cacheStrategy.invalidate(serviceTag)
		cacheStrategy.invalidate(serviceTag + id)
		return id
	}
}
export const articleService = (type: ArticleType) => new ArticleService(type)
