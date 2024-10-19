import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: ['/admin', '/auth', '/signup', '/verify', '/privacy', '/terms']
			}
		],
		//TODO: change sitemap url
		sitemap: 'https://geomax.by/sitemap.xml'
	}
}
