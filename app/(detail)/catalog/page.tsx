import { productService } from '@front/entities/product/_service'
import SidebarFilter from '@front/features/sidebar/pub/sidebar'
import { PriceToRub } from '@front/shared/lib/utils'
import { Badge } from '@front/shared/ui/badge'
import { Button } from '@front/shared/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@front/shared/ui/card'
import JSONContentRenderer from '@front/shared/ui/contentRender'
import Image from 'next/image'
import Link from 'next/link'

export default async function CatalogPage({
	searchParams
}: {
	searchParams: { q?: string }
}) {
	const items = await productService.getAll()
	const products = searchParams.q
		? items.filter(item => item.title === searchParams.q)
		: items

	return (
		<main className="container flex justify-between gap-12 md:flex-col py-20 px-4">
			<SidebarFilter />
			<div className="w-full">
				<h1 className="text-3xl font-bold mb-6">Каталог продуктов</h1>
				<div className="grid sm:grid-cols-1 md:grid-cols-2  grid-cols-3 gap-6">
					{products.map(product => (
						<Card key={product.id} className="flex flex-col">
							{product.availability && (
								<div className="rating cursor-pointer" title="Продукт имеет в наличии">
									<div className="rating__inner">
										<p className="rating__value">Есть в наличие</p>
									</div>
								</div>
							)}
							<CardHeader>
								<Image
									src={product.images[0] || '/placeholder.svg'}
									alt={product.title}
									width={200}
									height={200}
									className="w-full h-48 object-cover rounded-t-lg"
								/>
							</CardHeader>
							<CardContent className="flex-grow">
								<CardTitle className="mb-2 flex justify-between items-center">
									<span className="text-lg">{product.title}</span>
									{product.category && (
										<Badge className="ml-2" variant="secondary">
											{product.category.title}
										</Badge>
									)}
								</CardTitle>
								<JSONContentRenderer content={product.desc} />
								{product.price && (
									<p className="text-2xl mt-2 font-bold text-primary">
										{PriceToRub(product.price)}
									</p>
								)}
							</CardContent>
							<CardFooter className="flex justify-end gap-2">
								<Button variant="outline">
									<Link href={`/catalog/${product.id}`}>Подробнее</Link>
								</Button>
								<Button>Заказать</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</main>
	)
}
