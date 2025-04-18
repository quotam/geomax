import { Metadata } from 'next'

import { getProductListService } from '@front/entities/product/server'
import { ProductCard } from '@front/features/productCard/pub/productCard'
import { CatalogSearchParams, SortWidget } from '@front/features/sidebar/pub/filter'
import { compileMDX } from '@front/shared/lib/mdx/server'

export const metadata: Metadata = {
	title: 'Каталог продуктов',
	description:
		'В нашем каталоге Вы найдете все необходимые системы точного земледелия для оснащения своей сельскохозяйственной техники системами автопилотирования',
	keywords:
		'каталог автопилотов, автопилоты для сельского хозяйства, купить автопилоты, купить подруливающие устройства, купить RTK, купить GNSS, купить Trimble, купить CHCNAV',
	openGraph: {
		title: 'Каталог продуктов',
		description:
			'Каталог - Купить автопилот, подруливающие устройства и RTK станции для сельского хозяйства - ООО ГЕОМАКС - GPSArgo'
	}
}

export default async function CatalogPage({ searchParams }: { searchParams: CatalogSearchParams }) {
	const params = await searchParams

	const data = await getProductListService.exec()

	let filteredData = [...data]
	if (params.inStock) {
		filteredData = filteredData.filter(product => product.avability !== false)
	}

	if (params.sort) {
		switch (params.sort) {
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

	const compiled = await Promise.all(
		filteredData.map(async e => ({
			...e,
			description: await compileMDX(e.description).then(r => r.code)
		}))
	)

	return (
		<div className="w-full">
			<div className="flex items-center justify-between flex-wrap mb-12">
				<h1 className="text-3xl sm:text-2xl font-bold ">Каталог продуктов</h1>
				<SortWidget search={params} />
			</div>
			<div className="grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 gap-6">
				{compiled.map(product => (
					<ProductCard key={product.id} product={product} link={`/catalog/${product.slug}`} />
				))}
			</div>
		</div>
	)
}
