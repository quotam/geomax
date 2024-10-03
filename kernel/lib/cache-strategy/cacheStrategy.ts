import { CacheStrategy } from './model'
import { revalidateTag, unstable_cache } from 'next/cache'

export class nextCacheStrategy implements CacheStrategy {
	async fetch<T>(
		tags: string[],
		fn: () => Promise<T>,
		revalidate?: number
	): Promise<T> {
		return unstable_cache(fn, tags, { tags: tags, revalidate })()
	}
	invalidate(tag: string): void {
		return revalidateTag(tag)
	}
}
