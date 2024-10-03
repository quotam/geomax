import { nextCacheStrategy } from './cacheStrategy'

export const cacheRevalidateTime = {
	likes: 60 * 60 * 60 * 24
}

const cacheStrategy = new nextCacheStrategy()

export default cacheStrategy
