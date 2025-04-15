import { revalidateTag, unstable_cache } from 'next/cache'

export interface CacheStrategy {
	fetch<T>(key: unknown[], getData: () => Promise<T>): Promise<T>
	revalidate: () => void
}

export class DummyCacheStrategy implements CacheStrategy {
	fetch<T>(_: unknown[], getData: () => Promise<T>): Promise<T> {
		return getData()
	}
	revalidate() {}
}
export class NextJsCacheStrategy implements CacheStrategy {
	constructor(
		private readonly revalidateInterval: number = 60 * 60 * 24 // 24 hour in seconds
	) {}

	private readonly BASE_KEY = 'nextjs-cache'

	revalidate() {
		revalidateTag(this.BASE_KEY)
	}

	fetch<T>(key: unknown[], getData: () => Promise<T>): Promise<T> {
		const normalizedKey = this.normalizeCacheKey(key)
		const cachedFn = unstable_cache(
			async () => {
				return getData()
			},
			normalizedKey,
			{
				revalidate: this.revalidateInterval,
				tags: [this.BASE_KEY, ...this.getCacheTags(key)]
			}
		)

		return cachedFn()
	}

	private normalizeCacheKey(key: unknown[]): string[] {
		return key.map(k => (typeof k === 'string' ? k : JSON.stringify(k)))
	}

	private getCacheTags(key: unknown[]): string[] {
		return this.normalizeCacheKey(key)
	}
}
