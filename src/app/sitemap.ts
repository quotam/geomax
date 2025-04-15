import { MetadataRoute } from 'next'

import { getOffersListService } from '@front/entities/offer/server'
import { getProductListService } from '@front/entities/product/server'
import { getProjectListService } from '@front/entities/project/server'
import { privateConfig } from '@front/shared/config/privateConfig'

const baseUrl = privateConfig.SITE_URL

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const lastModified = new Date()

	const [projects, offers] = await Promise.all([
		getProjectListService.exec(),
		getOffersListService.exec()
	])

	const articles = [
		...offers.map(item => ({
			url: `${baseUrl}/offer/${item.slug}`,
			lastModified
		})),
		...projects.map(item => ({
			url: `${baseUrl}/project/${item.slug}`,
			lastModified
		}))
	]

	const products = await getProductListService.exec().then(r =>
		r.map(item => ({
			url: `${baseUrl}/product/${item.slug}`,
			lastModified
		}))
	)

	return [
		...articles,
		...products,
		{
			url: baseUrl + '/legal',
			lastModified: new Date().toISOString()
		},
		{
			url: baseUrl + '/faq',
			lastModified: new Date().toISOString()
		},
		{
			url: baseUrl + '/contacts',
			lastModified: new Date().toISOString()
		},
		{
			url: baseUrl + '/calc',
			lastModified: new Date().toISOString()
		}
		// ...atr,
		// ...prd
	]
}
