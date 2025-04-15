import { cache } from 'react'

import { contentApi } from '@front/shared/api/content'

import { CategotyEntity, FactureEntity, ProductDetailEntity, ProductEntity } from '../_domain/types'

class ProductRepository {
	getDetailProduct = cache(async (productSlug: string): Promise<ProductDetailEntity> => {
		const { product, facturer, categories } = await this.getSingleProduct(productSlug)

		return {
			id: product.id,

			title: product.title,
			slug: productSlug,
			price: product.price,
			avability: product.avability,
			description: product.description,

			metaDescription: product.metaDescription,
			metaKeywords: product.metaKeywords,

			thumbnail: product.thumbnail,
			imagePath: contentApi.getStogarePath('product', productSlug),

			facturer,
			categories: categories.length > 0 ? categories : undefined,

			body: product.body,

			images: product.images,
			videos: product.videos
		}
	})

	getFactureList = cache(async (): Promise<FactureEntity[]> => {
		const products = await this.getProductList()
		const manufacturerMap = new Map<string, FactureEntity>()

		for (const product of products) {
			if (product.facturer && !manufacturerMap.has(product.facturer.id)) {
				manufacturerMap.set(product.facturer.id, product.facturer)
			}
		}

		return Array.from(manufacturerMap.values())
	})

	getCategoryList = cache(async (): Promise<CategotyEntity[]> => {
		const products = await this.getProductList()

		const uniqueCategories = new Map<string, CategotyEntity>()

		products.forEach(product => {
			product.categories?.forEach(category => {
				uniqueCategories.set(category.id, category)
			})
		})

		return Array.from(uniqueCategories.values())
	})

	getProductList = cache(async (): Promise<ProductEntity[]> => {
		const manifest = await contentApi.fetchManifest()

		const fetchProduct = async (productSlug: string): Promise<ProductEntity> => {
			const { product, facturer, categories } = await this.getSingleProduct(productSlug)

			return {
				id: product.id,
				thumbnail: product.thumbnail,
				price: product.price,
				avability: product.avability,
				title: product.title,
				imagePath: contentApi.getStogarePath('product', productSlug),
				description: product.description,
				slug: productSlug,
				facturer,
				categories: categories.length > 0 ? categories : undefined
			}
		}

		const setteldProducts = await Promise.allSettled(manifest.products.map(fetchProduct))

		setteldProducts.forEach((value, i) => {
			if (value.status === 'rejected') {
				console.error({
					msg: 'Product fetch failed',
					slug: manifest.products[i],
					error: value.reason
				})
			}
		})

		return setteldProducts
			.filter(
				(productResult): productResult is PromiseFulfilledResult<ProductEntity> =>
					productResult.status === 'fulfilled'
			)
			.map(product => product.value)
	})

	private async getSingleProduct(productSlug: string) {
		const product = await contentApi.fetchProduct(productSlug)

		let facturer: FactureEntity | undefined
		if (product.facturer) {
			const [facturerResult] = await Promise.allSettled([contentApi.fetchFacture(product.facturer)])
			if (facturerResult.status === 'fulfilled') {
				facturer = { slug: product.facturer, ...facturerResult.value }
			}
		}

		let categories: CategotyEntity[] = []

		if (product.categories?.length) {
			const categoryPromises = product.categories.map(async slug => {
				return await this.getSingleCategory(slug)
			})

			const settledCategories = await Promise.allSettled(categoryPromises)
			categories = settledCategories
				.filter(
					(result): result is PromiseFulfilledResult<CategotyEntity> => result.status === 'fulfilled'
				)
				.map(result => result.value)
		}
		return { product, facturer, categories }
	}

	async getSingleCategory(slug: string): Promise<CategotyEntity> {
		const category = await contentApi.fetchCategory(slug)
		return {
			slug,
			...category
		}
	}
}

export const productRepo = new ProductRepository()
