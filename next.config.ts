import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		formats: ['image/avif', 'image/webp']
	},
	rewrites: async () => [
		{
			source: '/storage/:path*',
			destination: `${process.env.CONTENT_URL}/:path*`
		}
	]
}

export default nextConfig
