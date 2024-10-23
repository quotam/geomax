/** @type {import('next').NextConfig} */
const nextConfig = {
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						source: '/(.*)',
						headers: [
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
							}
						]
					},
					{
						source: '/sw.js',
						headers: [
							{
								key: 'Content-Type',
								value: 'application/javascript; charset=utf-8'
							},
							{
								key: 'Cache-Control',
								value: 'no-cache, no-store, must-revalidate'
							},
							{
								key: 'Content-Security-Policy',
								value: "default-src 'self'; script-src 'self'"
							}
						]
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
