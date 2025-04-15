import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	if (/\.(png|jpe?g|gif|webp|avif)$/.test(request.nextUrl.pathname)) {
		console.log('rewrite image request', request.url)

		return NextResponse.rewrite(request.nextUrl, {
			headers: {
				Authorization: `token ${process.env.AUTH_TOKEN}`
			}
		})
	}

	console.log('some motherfucker tried to access storage', request.url)

	return NextResponse.error()
}

export const config = {
	matcher: '/storage/:path*'
}
