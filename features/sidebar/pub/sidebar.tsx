'use client'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@front/shared/ui/accordion'
import { Button } from '@front/shared/ui/button'
import { Checkbox } from '@front/shared/ui/checkbox'
import { Input } from '@front/shared/ui/input'
import { Label } from '@front/shared/ui/label'
import { Switch } from '@front/shared/ui/switch'
import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SidebarFilter({
	params
}: {
	params: {
		categories: {
			id: string
			title: string
		}[]
		facturers: {
			id: string
			title: string
		}[]
	}
}) {
	const searchParams = useSearchParams()
	const router = useRouter()

	const [search, setSearch] = useState(searchParams.get('q') || '')

	const [inStock, setInStock] = useState(searchParams.get('inStock') === 'true' || false)
	const [category, setCategory] = useState<string[]>(searchParams.get('category')?.split(',') || [])
	const [manufacturer, setManufacturer] = useState<string[]>(
		searchParams.get('manufacturer')?.split(',') || []
	)

	useEffect(() => {
		setInStock(searchParams.get('inStock') === 'true' || false)
		setCategory(searchParams.get('category')?.split(',') || [])
		setManufacturer(searchParams.get('manufacturer')?.split(',') || [])
		setSearch(searchParams.get('q') || '')
	}, [searchParams])

	return (
		<div className="w-100 md:w-full p-5 bg-card border rounded-lg shadow overflow-y-auto">
			<div className="mb-6">
				<h2 className="text-lg font-bold mb-2">Поиск</h2>
				<div className="relative">
					<Input
						type="text"
						placeholder="Поиск продуктов..."
						className="pr-8"
						onChange={e => setSearch(e.target.value)}
					/>
					<Search className="absolute right-2 top-2.5 h-5 w-5 text-muted-foreground" />
				</div>
			</div>

			<h2 className="text-lg font-bold mb-2">Фильтры</h2>

			<Accordion type="multiple" className="w-full">
				{params.categories && (
					<AccordionItem value="category">
						<AccordionTrigger>Категория продукта</AccordionTrigger>
						<AccordionContent>
							<div className="flex flex-col space-y-2">
								{params.categories.map(cat => (
									<Label key={cat.id} className="flex items-center space-x-2">
										<Checkbox
											checked={category.includes(cat.id)}
											onCheckedChange={() =>
												setCategory(prev =>
													prev.includes(cat.id) ? prev.filter(id => id !== cat.id) : [...prev, cat.id]
												)
											}
											id={cat.id}
										/>
										<span>{cat.title}</span>
									</Label>
								))}
							</div>
						</AccordionContent>
					</AccordionItem>
				)}

				{params.facturers && (
					<AccordionItem value="manufacturer">
						<AccordionTrigger>Производитель</AccordionTrigger>
						<AccordionContent>
							<div className="flex flex-col space-y-2">
								{params.facturers.map(facturer => (
									<Label key={facturer.id} className="flex items-center space-x-2">
										<Checkbox
											checked={manufacturer.includes(facturer.id)}
											id={facturer.id}
											onCheckedChange={() =>
												setManufacturer(prev =>
													prev.includes(facturer.id)
														? prev.filter(id => id !== facturer.id)
														: [...prev, facturer.id]
												)
											}
										/>
										<span>{facturer.title}</span>
									</Label>
								))}
							</div>
						</AccordionContent>
					</AccordionItem>
				)}
			</Accordion>

			<div className="my-6">
				<h2 className="text-lg font-semibold mb-2">Наличие</h2>
				<div className="flex items-center space-x-2">
					<Switch id="in-stock" checked={inStock} onCheckedChange={setInStock} />
					<Label htmlFor="in-stock">Только в наличии</Label>
				</div>
			</div>
			<Button
				onClick={() => {
					const url = new URL(window.location.href)
					if (inStock) {
						url.searchParams.set('inStock', 'true')
					} else {
						url.searchParams.delete('inStock')
					}
					if (category.length > 0) {
						url.searchParams.set('category', category.join(','))
					} else {
						url.searchParams.delete('category')
					}
					if (manufacturer.length > 0) {
						url.searchParams.set('manufacturer', manufacturer.join(','))
					} else {
						url.searchParams.delete('manufacturer')
					}
					if (search) {
						url.searchParams.set('q', search)
					} else {
						url.searchParams.delete('q')
					}
					router.push(url.toString())
				}}
				className="w-full"
			>
				Поиск
			</Button>
		</div>
	)
}
