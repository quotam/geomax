import dbClient from '@front/shared/lib/dbClient'
import { ArticleStatus, ArticleType } from '@prisma/client'
import { articleEntity } from './_domain/entity'
import cacheStrategy from '@front/kernel/lib/cache-strategy'
import { userID } from '@front/kernel/domain/user'
import { ArticleUpdateDto } from './_domain/dto'

const serviceTag = 'article'

class ArticleService {
	constructor(private readonly _type: ArticleType) {}

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
		return id
	}
}
export const articleService = (type: ArticleType) => new ArticleService(type)
