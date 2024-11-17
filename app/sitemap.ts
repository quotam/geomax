import { articleService } from '@front/entities/article/_service'
import { productService } from '@front/entities/product/_service'
import { privateConfig } from '@front/shared/config/privateConfig'
import { MetadataRoute } from 'next'

const baseUrl = privateConfig.NEXTAUTH_URL

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const article = await articleService('NEWS').prepareStatic()
	const atr = article
		.filter(item => item.type !== 'FAQ')
		.map(item => ({
			url: `${baseUrl}/${item.type.toLowerCase()}/${item.id}`,
			lastModified: new Date(item.updatedAt).toISOString()
		}))

	const products = await productService.getAll()
	const prd = products.map(item => ({
		url: `${baseUrl}/catalog/${item.id}`,
		lastModified: new Date().toISOString()
	}))

	return [
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
		},
		...atr,
		...prd
	]
}
