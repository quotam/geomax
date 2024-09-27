'use client'
import { Badge } from '@front/shared/ui/badge'
import { Button } from '@front/shared/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@front/shared/ui/card'
import { Checkbox } from '@front/shared/ui/checkbox'
import { Input } from '@front/shared/ui/input'
import { Label } from '@front/shared/ui/label'
import { RadioGroup, RadioGroupItem } from '@front/shared/ui/radio-group'
import { Slider } from '@front/shared/ui/slider'
import { motion } from 'framer-motion'
import {
	GridIcon,
	InfoIcon,
	LayoutListIcon,
	ListIcon,
	MenuIcon,
	SearchIcon,
	ShoppingCartIcon
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const list = {
	visible: {
		opacity: 1,

		transition: {
			when: 'beforeChildren',
			staggerChildren: 0.1
		}
	},
	hidden: {
		opacity: 0,
		transition: {
			when: 'afterChildren'
		}
	}
}

const item = {
	visible: { opacity: 1, y: 0, display: 'block' },
	hidden: { opacity: 0, y: -20, display: 'none' }
}
const categories = [
	{ id: 'steering', name: 'Подруливающие устройства' },
	{ id: 'navigation', name: 'Навигаторы' },
	{ id: 'accessories', name: 'Аксессуары' }
]

const manufacturers = [
	{ id: 'garmin', name: 'Garmin' },
	{ id: 'raymarine', name: 'Raymarine' },
	{ id: 'lowrance', name: 'Lowrance' },
	{ id: 'simrad', name: 'Simrad' }
]

const products = [
	{
		id: 1,
		name: 'Подруливающее устройство X1',
		category: 'steering',
		manufacturer: 'raymarine',
		price: 999.99,
		imageUrl: '/placeholder.svg'
	},
	{
		id: 2,
		name: 'Навигатор Pro 5000',
		category: 'navigation',
		manufacturer: 'garmin',
		price: 299.99,
		imageUrl: '/placeholder.svg'
	},
	{
		id: 3,
		name: 'Держатель для навигатора',
		category: 'accessories',
		manufacturer: 'lowrance',
		price: 29.99,
		imageUrl: '/placeholder.svg'
	},
	{
		id: 4,
		name: 'Подруливающее устройство Y2',
		category: 'steering',
		manufacturer: 'simrad',
		price: 1299.99,
		imageUrl: '/placeholder.svg'
	},
	{
		id: 5,
		name: 'Навигатор Marine 3000',
		category: 'navigation',
		manufacturer: 'raymarine',
		price: 399.99,
		imageUrl: '/placeholder.svg'
	},
	{
		id: 6,
		name: 'Кабель питания',
		category: 'accessories',
		manufacturer: 'garmin',
		price: 19.99,
		imageUrl: '/placeholder.svg'
	}
]

export default function ProductCatalog() {
	const [selectedCategories, setSelectedCategories] = useState<string[]>([])
	const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>(
		[]
	)
	const [priceRange, setPriceRange] = useState([0, 1500])
	const [searchTerm, setSearchTerm] = useState('')
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
	const [displayVariant, setDisplayVariant] = useState('grid')

	const filteredProducts = products.filter(
		product =>
			(selectedCategories.length === 0 ||
				selectedCategories.includes(product.category)) &&
			(selectedManufacturers.length === 0 ||
				selectedManufacturers.includes(product.manufacturer)) &&
			product.price >= priceRange[0] &&
			product.price <= priceRange[1] &&
			product.name.toLowerCase().includes(searchTerm.toLowerCase())
	)

	const renderProductGrid = (product: any) => (
		<motion.div key={product.id} variants={item}>
			<Card className="flex flex-col">
				<CardHeader>
					<Image
						src={product.imageUrl}
						alt={product.name}
						width={200}
						height={200}
						className="w-full h-48 object-cover rounded-t-lg"
					/>
					<CardTitle className="mt-2">{product.name}</CardTitle>
				</CardHeader>
				<CardContent>
					<Badge variant="secondary">{product.category}</Badge>
					<p className="text-sm text-gray-500">
						Производитель:{' '}
						{manufacturers.find(m => m.id === product.manufacturer)?.name}
					</p>
				</CardContent>
				<CardFooter className="mt-auto flex justify-between items-center">
					<span className="text-lg font-bold">${product.price.toFixed(2)}</span>
					<div className="flex gap-2">
						<Button variant="outline" size="sm">
							<InfoIcon className="h-4 w-4 mr-2" />
							Детали
						</Button>
						<Button size="sm">
							<ShoppingCartIcon className="h-4 w-4 mr-2" />
							Заказать
						</Button>
					</div>
				</CardFooter>
			</Card>
		</motion.div>
	)

	const renderProductList = (product: any) => (
		<motion.div key={product.id} variants={item}>
			<Card className="flex flex-row items-center p-4">
				<Image
					src={product.imageUrl}
					alt={product.name}
					width={100}
					height={100}
					className="w-24 h-24 object-cover rounded-lg mr-4"
				/>
				<div className="flex-1">
					<h3 className="text-lg font-bold">{product.name}</h3>
					<Badge className="" variant="secondary">
						{product.category}
					</Badge>
					<p className="text-sm text-muted-foreground">
						Производитель:{' '}
						{manufacturers.find(m => m.id === product.manufacturer)?.name}
					</p>
				</div>
				<div className="flex flex-col items-end gap-2">
					<span className="text-lg font-bold">${product.price.toFixed(2)}</span>
					<Button size="sm">
						<ShoppingCartIcon className="h-4 w-4 mr-2" />
						Заказать
					</Button>
				</div>
			</Card>
		</motion.div>
	)

	const renderProductCompact = (product: any) => (
		<motion.div key={product.id} variants={item}>
			<Card className="flex items-center p-2">
				<Image
					src={product.imageUrl}
					alt={product.name}
					width={50}
					height={50}
					className="w-12 h-12 object-cover rounded-lg mr-2"
				/>
				<div className="flex-1 mr-2">
					<h3 className="text-sm font-bold">{product.name}</h3>
					<Badge className="mb-2" variant="secondary">
						{manufacturers.find(m => m.id === product.manufacturer)?.name}
					</Badge>
				</div>
				<span className="text-sm font-bold mr-2">${product.price.toFixed(2)}</span>
				<Button size="sm" variant="ghost">
					<ShoppingCartIcon className="h-4 w-4" />
				</Button>
			</Card>
		</motion.div>
	)

	const renderProducts = () => {
		switch (displayVariant) {
			case 'grid':
				return (
					<motion.div
						initial="hidden"
						key="grid"
						animate="visible"
						variants={list}
						className="grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 xl:grid-cols-4 gap-12"
					>
						{filteredProducts.map(renderProductGrid)}
					</motion.div>
				)
			case 'list':
				return (
					<motion.div
						key="list"
						initial="hidden"
						animate="visible"
						variants={list}
						className="flex flex-col gap-8"
					>
						{filteredProducts.map(renderProductList)}
					</motion.div>
				)
			case 'compact':
				return (
					<motion.div
						key="compact"
						initial="hidden"
						animate="visible"
						variants={list}
						className="grid sm:grid-cols-1 grid-cols-2 gap-4"
					>
						{filteredProducts.map(renderProductCompact)}
					</motion.div>
				)
			default:
				return null
		}
	}

	return (
		<main className="px-4 py-20">
			<div className="container mx-auto ">
				<h2 className="text-3xl font-bold mb-12 text-center">Каталог товаров</h2>
				<div className="flex sm:flex-col flex-row items-start gap-8">
					<motion.aside
						className={`min-w-80 sm:w-full border-[.1rem] bg-white p-6 rounded-lg shadow-md ${
							isSidebarOpen ? 'block' : 'hidden'
						}`}
					>
						<h3 className="text-xl font-bold mb-4">Фильтры</h3>

						<div className="mb-6">
							<h3 className="font-bold mb-2">Категории</h3>
							{categories.map(category => (
								<div key={category.id} className="flex items-center space-x-2 mb-2">
									<Checkbox
										id={`category-${category.id}`}
										checked={selectedCategories.includes(category.id)}
										onCheckedChange={checked => {
											if (checked) {
												setSelectedCategories([...selectedCategories, category.id])
											} else {
												setSelectedCategories(
													selectedCategories.filter(id => id !== category.id)
												)
											}
										}}
									/>
									<Label htmlFor={`category-${category.id}`}>{category.name}</Label>
								</div>
							))}
						</div>

						<div className="mb-6">
							<h3 className="font-bold mb-2">Производители</h3>
							{manufacturers.map(manufacturer => (
								<div key={manufacturer.id} className="flex items-center space-x-2 mb-2">
									<Checkbox
										id={`manufacturer-${manufacturer.id}`}
										checked={selectedManufacturers.includes(manufacturer.id)}
										onCheckedChange={checked => {
											if (checked) {
												setSelectedManufacturers([
													...selectedManufacturers,
													manufacturer.id
												])
											} else {
												setSelectedManufacturers(
													selectedManufacturers.filter(id => id !== manufacturer.id)
												)
											}
										}}
									/>
									<Label htmlFor={`manufacturer-${manufacturer.id}`}>
										{manufacturer.name}
									</Label>
								</div>
							))}
						</div>

						<div className="mb-6">
							<h3 className="font-bold mb-2">Цена</h3>
							<div className="flex justify-between mb-2">
								<span>${priceRange[0]}</span>
								<span>${priceRange[1]}</span>
							</div>
							<Slider
								min={0}
								max={1500}
								step={10}
								value={priceRange}
								onValueChange={setPriceRange}
							/>
						</div>
					</motion.aside>

					{/* Основная область */}
					<div className="flex-1">
						<div className="flex sm:flex-col flex-row gap-4 mb-6">
							<div className="relative flex-1">
								<SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
								<Input
									type="search"
									placeholder="Поиск товаров..."
									className="pl-8"
									value={searchTerm}
									onChange={e => setSearchTerm(e.target.value)}
								/>
							</div>
							<Button
								variant="secondary"
								onClick={() => setIsSidebarOpen(!isSidebarOpen)}
							>
								<MenuIcon className="h-4 w-4 mr-2" />
								Фильтры
							</Button>
						</div>

						<div className="mb-6">
							<h3 className="font-bold mb-2">Вариант отображения</h3>
							<RadioGroup
								value={displayVariant}
								onValueChange={setDisplayVariant}
								className="flex space-x-4"
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="grid" id="grid" />
									<Label htmlFor="grid" className="flex items-center">
										<GridIcon className="h-4 w-4 mr-1" />
										Сетка
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="list" id="list" />
									<Label htmlFor="list" className="flex items-center">
										<ListIcon className="h-4 w-4 mr-1" />
										Список
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="compact" id="compact" />
									<Label htmlFor="compact" className="flex items-center">
										<LayoutListIcon className="h-4 w-4 mr-1" />
										Компактный
									</Label>
								</div>
							</RadioGroup>
						</div>

						{renderProducts()}
					</div>
				</div>
			</div>
		</main>
	)
}
