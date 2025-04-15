import { bundleMDX } from 'mdx-bundler'

export const compileMDX = (file: string) => {
	try {
		return bundleMDX({ source: file })
	} catch (e) {
		console.error(e)
		return bundleMDX({
			source: '<span className="text-destructive">Содержимое недоступно.🔒😕</span>'
		})
	}
}
