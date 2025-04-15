import { MetadataRoute } from 'next'

import { privateConfig } from '@front/shared/config/privateConfig'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: ['legal/', '/privacy', '/terms']
			}
		],
		sitemap: privateConfig.SITE_URL + '/sitemap.xml'
	}
}
