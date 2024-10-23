/** @type {import('next').NextConfig} */
const nextConfig = {
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
