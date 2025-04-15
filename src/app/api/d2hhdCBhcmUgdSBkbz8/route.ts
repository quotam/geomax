import { NextJsCacheStrategy } from '@front/shared/api/content/_lib/cacheStrategy'
import { privateConfig } from '@front/shared/config/privateConfig'

const cacheStrategy = new NextJsCacheStrategy()
const SECRET_TOKEN = privateConfig.SECRET_TOKEN

export async function POST(request: Request) {
	const requestToken = request.headers.get('X-Secret-Token')

	if (!SECRET_TOKEN || requestToken !== SECRET_TOKEN) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401,
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}

	try {
		cacheStrategy.revalidate()
		return new Response(JSON.stringify({ message: 'Cache revalidated successfully' }), {
			headers: {
				'Content-Type': 'application/json'
			}
		})
	} catch (error: unknown) {
		console.error(error)
		return new Response(JSON.stringify({ error: 'Revalidation failed' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}
}
