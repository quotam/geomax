'use server'

import { schemaParse } from '@front/kernel/lib/zod/shemaParse'
import dbClient from '@front/shared/lib/dbClient'
import { z } from 'zod'

const schema = z.string()

export const searchAction = async (q: z.infer<typeof schema>) => {
	const result = schemaParse(schema, q)

	const articles = await dbClient.article.findMany({
		where: {
			OR: [
				{
					title: {
						contains: result
					}
				},
				{
					meta: {
						contains: result
					}
				}
			],
			AND: {
				status: 'PUBLISHED'
			}
		},
		take: 5
	})
	const products = await dbClient.product.findMany({
		where: {
			OR: [
				{
					title: {
						contains: result
					}
				},
				{
					meta: {
						contains: result
					}
				}
			],
			AND: {
				status: 'PUBLISHED'
			}
		},
		take: 5
	})

	return {
		articles,
		products
	}
}
