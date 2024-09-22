'use client'
import React, { useState } from 'react'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@front/shared/ui/card'
import { Button } from '@front/shared/ui/button'
import { Input } from '@front/shared/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@front/shared/ui/select'
import { Badge } from '@front/shared/ui/badge'
import { Search, ShoppingCart } from 'lucide-react'

const products = [
	{
		id: 1,
		name: 'АвтоПилот Про',
		category: 'Автопилоты',
		price: 199999,
		image: '/placeholder.svg?height=200&width=200',
		description: 'Передовая система автопилота для вашего судна'
	},
	{
		id: 2,
		name: 'ПодруливающееУстройство X1',
		category: 'Подруливающие устройства',
		price: 149999,
		image: '/placeholder.svg?height=200&width=200',
		description: 'Мощное подруливающее устройство для улучшенной маневренности'
	},
	{
		id: 3,
		name: 'НавиКомпас Элит',
		category: 'Навигационное оборудование',
		price: 79999,
		image: '/placeholder.svg?height=200&width=200',
		description: 'Высокоточный морской компас с GPS интеграцией'
	},
	{
		id: 4,
		name: 'ЭхоСонар 5000',
		category: 'Эхолоты',
		price: 129999,
		image: '/placeholder.svg?height=200&width=200',
		description:
			'Продвинутый эхолот для точного измерения глубины и обнаружения рыбы'
	},
	{
		id: 5,
		name: 'РадарСкан 360',
		category: 'Радары',
		price: 299999,
		image: '/placeholder.svg?height=200&width=200',
		description:
			'Всенаправленный радар для обнаружения объектов на большом расстоянии'
	},
	{
		id: 6,
		name: 'АвтоШтурвал Комфорт',
		category: 'Автопилоты',
		price: 169999,
		image: '/placeholder.svg?height=200&width=200',
		description: 'Удобный автопилот с интуитивным управлением'
	}
]

const CatalogPage = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const [categoryFilter, setCategoryFilter] = useState('all')

	const filteredProducts = products.filter(
		product =>
			product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
			(categoryFilter === 'all' || product.category === categoryFilter)
	)

	return (
		<main className="container mx-auto px-4 py-12">
			<div className="flex sm:flex-col flex-row justify-between items-center mb-12 space-y-4 md:space-y-0 md:space-x-4">
				<div className="sm:w-full w-1/3 relative">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Поиск товаров..."
						className="pl-10"
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
					/>
				</div>
				<Select value={categoryFilter} onValueChange={setCategoryFilter}>
					<SelectTrigger className="sm:w-full w-[200px]">
						<SelectValue placeholder="Выберите категорию" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">Все категории</SelectItem>
						<SelectItem value="Автопилоты">Автопилоты</SelectItem>
						<SelectItem value="Подруливающие устройства">
							Подруливающие устройства
						</SelectItem>
						<SelectItem value="Навигационное оборудование">
							Навигационное оборудование
						</SelectItem>
						<SelectItem value="Эхолоты">Эхолоты</SelectItem>
						<SelectItem value="Радары">Радары</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="grid sm:grid-cols-1 grid-cols-3 lg:grid-cols-3 w-[90%] mb-12 mx-auto gap-16">
				{filteredProducts.map(product => (
					<Card key={product.id} className="flex flex-col">
						<CardHeader>
							<img
								src={product.image}
								alt={product.name}
								className="w-full h-48 object-cover mb-4 rounded-md"
							/>
							<CardTitle className="text-xl">{product.name}</CardTitle>
						</CardHeader>
						<CardContent className="flex-grow">
							<Badge variant="secondary" className="mb-2">
								{product.category}
							</Badge>
							<p className="text-muted-foreground">{product.description}</p>
						</CardContent>
						<CardFooter className="flex justify-between items-center">
							<span className="text-lg font-bold">
								{product.price.toLocaleString('ru-RU')} ₽
							</span>
							<div>
								<Button variant="outline">Детали</Button>
								<Button className="ml-2">Заказать</Button>
							</div>
						</CardFooter>
					</Card>
				))}
			</div>
		</main>
	)
}

export default CatalogPage
