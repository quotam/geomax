export interface CacheStrategy {
	fetch<T>(tags: string[], fn: () => Promise<T>): Promise<T>
	invalidate(tag: string): void
}
