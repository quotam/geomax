import Link from 'next/link'

import { getProductListService } from '@front/entities/product/server'
import { cn } from '@front/shared/lib/utils'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@front/shared/ui/accordion'
import { Button } from '@front/shared/ui/button'

import AvabilityFilter from './filter'

export default async function Sidebar() {
	const products = await getProductListService.exec()
	const categories = Array.from(new Set(products.flatMap(product => product.categories ?? [])))
	const factures = Array.from(new Set(products.flatMap(product => product.facturer ?? [])))

	return (
		<div className="w-full max-w-80 p-4 overflow-y-auto md:hidden">
			<div className="mb-6">
				<h2 className="text-lg font-bold mb-2">Фильтры</h2>
				<AvabilityFilter />
			</div>

			<div className="mb-6">
				<h2 className="text-lg font-bold mb-2">Категории</h2>
				<Accordion type="multiple" className="w-full">
					{categories.map(category => {
						const items = products.filter(e => e.categories?.some(c => c.id === category.id))
						return (
							<AccordionItem value={`category-${category.id}`} key={category.id}>
								<AccordionTrigger className="text-sm font-medium">
									{category.title} ({items.length})
								</AccordionTrigger>
								<AccordionContent>
									<ul className="pl-2 space-y-1">
										{items.map(product => (
											<li key={product.id} className="text-sm py-1">
												<Link
													href={`/catalog/${product.slug}`}
													className={cn(
														'cursor-pointer hover:underline',
														product.avability === false && 'text-muted-foreground'
													)}
												>
													{product.title}
													{product.avability === false && ' (нет в наличии)'}
												</Link>
											</li>
										))}
									</ul>
								</AccordionContent>
							</AccordionItem>
						)
					})}
				</Accordion>
			</div>

			<div>
				<h2 className="text-lg font-bold mb-2">Производители</h2>
				<Accordion type="multiple" className="w-full">
					{factures.map(manufacturer => {
						const items = products.filter(e => e.facturer?.id === manufacturer.id)
						return (
							<AccordionItem value={`manufacturer-${manufacturer.id}`} key={manufacturer.id}>
								<AccordionTrigger className="text-sm font-medium">
									{manufacturer.title} ({items.length})
								</AccordionTrigger>
								<AccordionContent>
									<ul className="pl-2 space-y-1">
										{items.map(product => (
											<li key={product.id} className="text-sm py-1">
												<Link
													href={`/catalog/${product.slug}`}
													className={cn(
														'cursor-pointer hover:underline',
														product.avability === false && 'text-muted-foreground'
													)}
												>
													{product.title}
													{product.avability === false && ' (нет в наличии)'}
												</Link>
											</li>
										))}
									</ul>
								</AccordionContent>
							</AccordionItem>
						)
					})}
				</Accordion>
			</div>

			<div className="mt-12">
				<span>Не нашли нужное или нужна помощь? Пишите или звоните — поможем с выбором! 😊 </span>
				<Button asChild className="mt-4">
					<Link href="?modal#faq">Заявка на консультацию</Link>
				</Button>
			</div>
		</div>
	)
}
