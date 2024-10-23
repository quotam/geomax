/** @type {import('next').NextConfig} */
const nextConfig = {
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'Content-Security-Policy',
						value:
							"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'"
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff'
					},
					{
						key: 'X-Frame-Options',
						value: 'DENY'
					},
					{
						key: 'Referrer-Policy',
						value: 'strict-origin-when-cross-origin'
					},
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable'
					}
				]
			}
		]
	},
	rewrites: () => [
		{
			source: '/storage/:path*',
			destination: `${process.env.S3_ENDPOINT}/:path*`
		}
	],
	images: {
		formats: ['image/avif', 'image/webp'],
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'img.youtube.com',
				port: '',
				pathname: '/**/**'
			},
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
				port: '',
				pathname: '/**/**'
			}
		]
	}
}

export default nextConfig
