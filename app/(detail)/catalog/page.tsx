import { productAbility } from '@front/entities/product/_ability'
import { productService } from '@front/entities/product/_service'
import OrderButt from '@front/features/orderButt'
import SidebarFilter from '@front/features/sidebar/pub/sidebar'
import { getAppSessionServer } from '@front/kernel/lib/next-auth/getAppSessionServer'
import { PriceToRub } from '@front/shared/lib/utils'
import { Badge } from '@front/shared/ui/badge'
import { Button } from '@front/shared/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@front/shared/ui/card'
import JSONContentRenderer from '@front/shared/ui/contentRender'
import { Settings, Tag } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

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

export default async function CatalogPage({
	searchParams
}: {
	searchParams: {
		q?: string
		category?: string
		manufacturer?: string
		inStock?: boolean
	}
}) {
	const session = await getAppSessionServer()

	const items = await productService.getAll()
	const prepareSearch = await productService.getSearchParams()

	const products = items.filter(product => {
		const { q, category, manufacturer, inStock } = searchParams

		const matchesQuery = q
			? product.title.toLowerCase().includes(q.toLowerCase()) ||
				product.meta.toLowerCase().includes(q.toLowerCase())
			: true

		const matchesCategory =
			category !== undefined
				? product.category
					? category.includes(product.category.id)
					: false
				: true

		const matchesManufacturer =
			manufacturer !== undefined
				? product.facturer
					? manufacturer.includes(product.facturer.id)
					: false
				: true

		const matchesInStock = inStock !== undefined ? Boolean(inStock) === product.availability : true

		return matchesQuery && matchesCategory && matchesManufacturer && matchesInStock
	})

	return (
		<main className="container flex justify-between gap-12 md:flex-col py-20 px-4">
			<SidebarFilter params={prepareSearch} />
			<div className="w-full">
				<h1 className="text-3xl font-bold mb-6">Каталог продуктов</h1>
				<div className="grid sm:grid-cols-1 md:grid-cols-2  grid-cols-3 gap-6">
					{products.map(product => (
						<Card key={product.id} className="flex flex-col relative">
							{session && productAbility(session).canUpdate() && (
								<Link href={`/admin/product/${product.id}`} className="text-primary absolute top-2 right-2">
									<Settings className="w-4 h-4" />
								</Link>
							)}

							{product.availability && (
								<div className="rating cursor-pointer" title="Продукт имеет в наличии">
									<div className="rating__inner">
										<p className="rating__value">Есть в наличие</p>
									</div>
								</div>
							)}
							<CardHeader>
								<Image
									loading="lazy"
									src={product.images[0] || '/placeholder.svg'}
									alt={product.title}
									width={800}
									height={400}
									className="w-full h-48 object-cover rounded-t-lg"
								/>
							</CardHeader>
							<CardContent className="flex-grow">
								<CardTitle className="mb-2 flex justify-between items-center">
									<span className="text-lg">{product.title}</span>
									{product.category && (
										<Badge className="ml-2" variant="secondary">
											<Tag className="h-4 w-4 mr-1" />
											{product.category.title}
										</Badge>
									)}
								</CardTitle>
								<JSONContentRenderer content={product.desc} />
								{product.price && (
									<p className="text-2xl mt-2 font-bold text-primary">{PriceToRub(product.price)}</p>
								)}
							</CardContent>
							<CardFooter className="flex justify-end gap-2">
								<Button variant="outline">
									<Link href={`/catalog/${product.id}`}>Подробнее</Link>
								</Button>

								<OrderButt product={`${product.title} - артикул: ${product.id}`} />
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</main>
	)
}
