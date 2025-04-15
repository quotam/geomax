'use server'

import { getOffersListService } from '@front/entities/offer/server'
import { getProductListService } from '@front/entities/product/server'
import { getProjectListService } from '@front/entities/project/server'
import { schemaParse } from '@front/kernel/lib/zod/shemaParse'
import { z } from 'zod'

const schema = z.string().max(100).trim()

export const searchAction = async (rawQuery: z.infer<typeof schema>) => {
	const searchQuery = schemaParse(schema, rawQuery).toLowerCase()

	const [projects, offers, products] = await Promise.all([
		getProjectListService.exec(),
		getOffersListService.exec(),
		getProductListService.exec()
	])

	const createSearchResult = <
		T extends { title: string; slug: string; imagePath: string; thumbnail?: string }
	>(
		items: T[],
		entityType: 'project' | 'offer' | 'product'
	) => {
		return items
			.filter(item => item.title.toLowerCase().includes(searchQuery))
			.map(item => ({
				title: item.title,
				slug: item.slug,
				entityType,
				matchIndex: item.title.toLowerCase().indexOf(searchQuery)
			}))
	}

	const articles = [
		...createSearchResult(projects, 'project'),
		...createSearchResult(offers, 'offer')
	]

	return {
		articles: articles
			.sort((a, b) => a.matchIndex - b.matchIndex)
			.map(({ title, slug, entityType }) => ({
				title,
				slug,
				entityType
			})),
		products: createSearchResult(products, 'product')
	}
}
