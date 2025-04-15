import { join } from 'path'

import { CacheStrategy } from './_lib/cacheStrategy'
import { ContentParser } from './_lib/content-parser'
import { FileFetcher } from './_lib/file-fetcher'
import { Article } from './_schemas/article.schema'
import articleSchema from './_schemas/article.schema.json'
import { Manifest } from './_schemas/manifest.schema'
import manifestSchema from './_schemas/manifest.schema.json'
import { Product } from './_schemas/product.schema'
import productSchema from './_schemas/product.schema.json'
import { Qa } from './_schemas/qa.schema'
import qaSchema from './_schemas/qa.schema.json'
import { Slider } from './_schemas/slider.schema'
import sliderSchema from './_schemas/slider.schema.json'
import { Tag } from './_schemas/tag.schema'
import tagSchema from './_schemas/tag.schema.json'

interface Deps {
	contentParser: ContentParser
	fileFetcher: FileFetcher
	cacheStrategy: CacheStrategy
}

export class ContentApi {
	constructor(
		private baseUrl: string,
		private d: Deps
	) {}

	getStogarePath(entity: 'product' | 'infoblock' | 'project' | 'offers', slug?: string) {
		switch (entity) {
			case 'product':
				return `/storage/product/products/${slug ? slug + '/' : ''}`
			case 'infoblock':
				return '/storage/infoblock/'
			case 'project':
				return `/storage/article/projects/${slug ? slug + '/' : ''}`
			case 'offers':
				return `/storage/article/offers/${slug ? slug + '/' : ''}`
		}
	}

	private async fetchAndParse<T>(url: string, schema: unknown, descriptor: string): Promise<T> {
		console.log(`[fetchAndParse] Загружаем ${descriptor} с ${url.split('heads')[1]}...`)
		const text = await this.d.fileFetcher.fetchText(url)
		console.log(`[fetchAndParse] Загружено, парсим ${descriptor}...`)
		const result = await this.d.contentParser.parse<T>(text, schema as object)
		console.log(`[fetchAndParse] Парсинг ${descriptor} завершён успешно.`)
		return result
	}

	async fetchManifest() {
		return this.d.cacheStrategy.fetch(['manifest'], () => this.fetchManifestQuery())
	}

	async fetchProduct(slug: string) {
		return this.d.cacheStrategy.fetch(['product', slug], () => this.fetchProductQuery(slug))
	}

	async fetchCategory(categorySlug: string) {
		return this.d.cacheStrategy.fetch(['category', categorySlug], () =>
			this.fetchCategoryQuery(categorySlug)
		)
	}

	async fetchFacture(categorySlug: string) {
		return this.d.cacheStrategy.fetch(['facture', categorySlug], () =>
			this.fetchFactureQuery(categorySlug)
		)
	}

	async fetchProject(slug: string) {
		return this.d.cacheStrategy.fetch(['project', slug], () => this.fetchProjectQuery(slug))
	}

	async fetchFaq() {
		return this.d.cacheStrategy.fetch(['faq'], () => this.fetchFaqQuery())
	}

	async fetchSlider() {
		return this.d.cacheStrategy.fetch(['slider'], () => this.fetchSliderQuery())
	}

	async fetchOffer(slug: string) {
		return this.d.cacheStrategy.fetch(['offer', slug], () => this.fetchOfferQuery(slug))
	}

	// Приватные методы-запросы

	private async fetchManifestQuery() {
		const url = this.getManifestUrl()
		return this.fetchAndParse<Manifest>(url, manifestSchema, 'манифест')
	}

	private async fetchProductQuery(slug: string) {
		const url = this.getProductUrl(slug)
		return await this.fetchAndParse<Product>(url, productSchema, `продукт (${slug})`)
	}

	private async fetchCategoryQuery(categorySlug: string) {
		return this.fetchTagQuery('categories', categorySlug)
	}

	private async fetchFactureQuery(categorySlug: string) {
		return this.fetchTagQuery('factures', categorySlug)
	}

	private async fetchProjectQuery(slug: string) {
		return this.fetchArticleQuery('projects', slug)
	}

	private async fetchOfferQuery(slug: string) {
		return this.fetchArticleQuery('offers', slug)
	}

	private async fetchArticleQuery(article: 'offers' | 'projects', slug: string) {
		const url = this.getArticleUrl(article, slug)
		return this.fetchAndParse<Article>(url, articleSchema, `статья (${article}, ${slug})`)
	}

	private async fetchTagQuery(tag: 'categories' | 'factures', slug: string) {
		const url = this.getTagUrl(tag, slug)
		return this.fetchAndParse<Tag>(url, tagSchema, `тег (${tag}, ${slug})`)
	}

	private async fetchFaqQuery() {
		const url = join(this.baseUrl, 'infoblock', 'faq.yaml')
		return this.fetchAndParse<Qa>(url, qaSchema, 'FAQ')
	}

	private async fetchSliderQuery() {
		const url = join(this.baseUrl, 'infoblock', 'slider.yaml')
		return this.fetchAndParse<Slider>(url, sliderSchema, 'слайдер')
	}

	private getArticleUrl(article: 'offers' | 'projects', slug: string): string {
		return join(this.baseUrl, `/article/${article}/${slug}/index.yaml`)
	}

	private getManifestUrl(): string {
		return join(this.baseUrl, 'manifest.yaml')
	}

	private getProductUrl(slug: string): string {
		return join(this.baseUrl, `/product/products/${slug}/index.yaml`)
	}

	private getTagUrl(tag: 'categories' | 'factures', slug: string): string {
		return join(this.baseUrl, `/product/${tag}/${slug}.yaml`)
	}
}
