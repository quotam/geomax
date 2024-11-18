import { privateConfig } from '@front/shared/config/privateConfig'
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: ['/admin', 'legal/', '/auth', '/signup', '/verify', '/privacy', '/terms']
			}
		],
		sitemap: privateConfig.NEXTAUTH_URL + '/sitemap.xml'
	}
}
