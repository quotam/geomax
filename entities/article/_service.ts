import { userID } from '@front/kernel/domain/user'
import dbClient from '@front/shared/lib/dbClient'
import { ArticleStatus, ArticleType } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import { ArticleUpdateDto } from './_domain/dto'
import { articleEntity } from './_domain/entity'

function invalidate(type: ArticleType, id?: string) {
	revalidatePath('/')
	revalidatePath(`/${type.toLowerCase()}`)
	if (id) revalidatePath(`/${type.toLowerCase()}/${id}`)
}

class ArticleService {
	constructor(private readonly _type: ArticleType) {}

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
				status: ArticleStatus.PUBLISHED,
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
		return await this._getCatFiltered()
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
		invalidate(this._type)
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
		return await dbClient.article.findMany({
			take: this.getCount(),
			where: {
				type: this._type,
				status: ArticleStatus.PUBLISHED
			},
			select: articleEntity.clientView
		})
	}

	async getAll() {
		return await dbClient.article.findMany({
			where: {
				type: this._type,
				status: ArticleStatus.PUBLISHED
			},
			select: articleEntity.clientView
		})
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
		invalidate(this._type, id)
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
		invalidate(this._type, id)
		return id
	}
}

export const articleService = (type: ArticleType) => new ArticleService(type)
