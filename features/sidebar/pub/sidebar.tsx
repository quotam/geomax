'use client'
import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@front/shared/ui/input'
import { Button } from '@front/shared/ui/button'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@front/shared/ui/accordion'
import { Checkbox } from '@front/shared/ui/checkbox'
import { Switch } from '@front/shared/ui/switch'
import { Label } from '@front/shared/ui/label'

export default function SidebarFilter() {
	const [inStock, setInStock] = useState(false)

	return (
		<div className="w-100 md:w-full p-5 bg-card border rounded-lg shadow overflow-y-auto">
			<div className="mb-6">
				<h2 className="text-lg font-bold mb-2">Поиск</h2>
				<div className="relative">
					<Input type="text" placeholder="Поиск продуктов..." className="pr-8" />
					<Search className="absolute right-2 top-2.5 h-5 w-5 text-muted-foreground" />
				</div>
			</div>

			<h2 className="text-lg font-bold mb-2">Фильтры</h2>

			<Accordion type="multiple" className="w-full">
				<AccordionItem value="category">
					<AccordionTrigger>Категория продукта</AccordionTrigger>
					<AccordionContent>
						<div className="flex flex-col space-y-2">
							<Label className="flex items-center space-x-2">
								<Checkbox id="category-electronics" />
								<span>Электроника</span>
							</Label>
							<Label className="flex items-center space-x-2">
								<Checkbox id="category-clothing" />
								<span>Одежда</span>
							</Label>
							<Label className="flex items-center space-x-2">
								<Checkbox id="category-books" />
								<span>Книги</span>
							</Label>
						</div>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="manufacturer">
					<AccordionTrigger>Производитель</AccordionTrigger>
					<AccordionContent>
						<div className="flex flex-col space-y-2">
							<Label className="flex items-center space-x-2">
								<Checkbox id="manufacturer-apple" />
								<span>Apple</span>
							</Label>
							<Label className="flex items-center space-x-2">
								<Checkbox id="manufacturer-samsung" />
								<span>Samsung</span>
							</Label>
							<Label className="flex items-center space-x-2">
								<Checkbox id="manufacturer-sony" />
								<span>Sony</span>
							</Label>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>

			<div className="my-6">
				<h2 className="text-lg font-semibold mb-2">Наличие</h2>
				<div className="flex items-center space-x-2">
					<Switch id="in-stock" checked={inStock} onCheckedChange={setInStock} />
					<Label htmlFor="in-stock">Только в наличии</Label>
				</div>
			</div>

			<Button className="w-full">Применить фильтры</Button>
		</div>
	)
}
