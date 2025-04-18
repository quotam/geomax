import { Metadata } from 'next'

import NotFoundPage from '@front/app/not-found'
import { getProductListService, getSingleCategoryService } from '@front/entities/product/server'
import { ProductCard } from '@front/features/productCard/pub/productCard'
import { CatalogSearchParams, SortWidget } from '@front/features/sidebar/pub/filter'
import { compileMDX } from '@front/shared/lib/mdx/server'

type PageParams = Promise<{
	catslug: string
}>

export async function generateMetadata({
	params: pageParams
}: {
	params: PageParams
}): Promise<Metadata> {
	const { catslug: slug } = await pageParams
	const category = await getSingleCategoryService.exec(slug)

	if (!category) {
		return {
			title: '404 | Страница не найдена'
		}
	}

	return {
		title: category.title,
		description: category.shortDescription,
		keywords: category.shortDescription
	}
}

export default async function CatalogCategoryPage({
	params,
	searchParams
}: {
	params: PageParams
	searchParams: CatalogSearchParams
}) {
	const { catslug: slug } = await params
	const search = await searchParams

	const data = await getSingleCategoryService.exec(slug)

	if (!data) return <NotFoundPage />

	const products = await getProductListService.exec()

	let filteredData = products.map(e => e).filter(e => e.categories?.some(c => c.id === data.id))

	if (search.inStock) {
		filteredData = filteredData.filter(product => product.avability !== false)
	}

	// Сортировка данных
	if (search.sort) {
		switch (search.sort) {
			case 'PriceAsc':
				filteredData.sort((a, b) => {
					if (a.price && b.price) {
						return a.price - b.price
					}
					return 0
				})
				break
			case 'PriceDesc':
				filteredData.sort((a, b) => {
					if (a.price && b.price) {
						return b.price - a.price
					}
					return 0
				})
				break
			case 'newest':
				filteredData.reverse()
				break
		}
	}

	// Компилируем описания только для отфильтрованных данных
	const compiled = await Promise.all(
		filteredData.map(async e => ({
			...e,
			description: await compileMDX(e.description).then(r => r.code)
		}))
	)

	return (
		<div className="w-full">
			<div className="flex items-center justify-between flex-wrap mb-12">
				<h1 className="text-3xl sm:text-2xl font-bold text-center">Категория: {data.title}</h1>
				<SortWidget search={search} />
			</div>

			<div className="grid sm:grid-cols-1 md:grid-cols-2  grid-cols-3 gap-6">
				{compiled.map(product => (
					<ProductCard key={product.id} product={product} link={`/catalog/${product.slug}`} />
				))}
			</div>
		</div>
	)
}
