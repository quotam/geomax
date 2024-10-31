import UserToolTip from '@front/entities/user/_ui/userToolTip'
import { Button } from '@front/shared/ui/button'
import { Input } from '@front/shared/ui/input'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@front/shared/ui/table'
import { Tooltip, TooltipContent, TooltipTrigger } from '@front/shared/ui/tooltip'
import { ProductStatus } from '@prisma/client'
import {
	Calendar,
	ChevronDownIcon,
	ChevronUpIcon,
	Edit,
	Eye,
	Pen,
	PlusSquare,
	Trash2
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Product } from './domain/type'

type props = {
	initialProducts?: Product[]
	createProduct: () => void
	isPendingCreate: boolean
	deleteProduct: (id: string) => void
}

export default function ProductList({
	initialProducts,
	deleteProduct,
	createProduct,
	isPendingCreate
}: props) {
	const [products, setProducts] = useState(initialProducts)
	const [searchTerm, setSearchTerm] = useState('')
	const [sortBy, setSortBy] = useState('title')
	const [sortOrder, setSortOrder] = useState('asc')

	useEffect(() => {
		setProducts(initialProducts)
	}, [initialProducts])

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value)
	}

	const handleSort = (column: string) => {
		if (sortBy === column) {
			setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
		} else {
			setSortBy(column)
			setSortOrder('asc')
		}
	}

	const filteredProducts = products
		?.filter(
			product =>
				product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				product.category?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				product.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
		)
		.sort((a, b) => {
			const key = sortBy as keyof Product

			if (a[key] === null) return sortOrder === 'asc' ? -1 : 1
			if (b[key] === null) return sortOrder === 'asc' ? 1 : -1

			if (a[key] < b[key]) return sortOrder === 'asc' ? -1 : 1
			if (a[key] > b[key]) return sortOrder === 'asc' ? 1 : -1
			return 0
		})

	return (
		<main className="px-4 w-full">
			<div className="flex justify-between mb-8">
				<h1 className="text-2xl font-bold">Управление продуктами</h1>
				<Input
					className="max-w-100"
					placeholder="Поиск продуктов..."
					defaultValue={searchTerm}
					onChange={handleSearch}
				/>
				<Button onClick={createProduct} disabled={isPendingCreate} variant="secondary">
					<PlusSquare className="mr-2 h-4 w-4" /> Добавить продукт
				</Button>
			</div>
			<div className="rounded-md border bg-card">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead onClick={() => handleSort('title')}>
								Название
								{sortBy === 'title' &&
									(sortOrder === 'asc' ? (
										<ChevronUpIcon className="inline ml-1" />
									) : (
										<ChevronDownIcon className="inline ml-1" />
									))}
							</TableHead>
							<TableHead onClick={() => handleSort('status')}>
								Статус
								{sortBy === 'status' &&
									(sortOrder === 'asc' ? (
										<ChevronUpIcon className="inline ml-1" />
									) : (
										<ChevronDownIcon className="inline ml-1" />
									))}
							</TableHead>
							<TableHead onClick={() => handleSort('user')}>
								Автор
								{sortBy === 'user' &&
									(sortOrder === 'asc' ? (
										<ChevronUpIcon className="inline ml-1" />
									) : (
										<ChevronDownIcon className="inline ml-1" />
									))}
							</TableHead>
							<TableHead onClick={() => handleSort('category')}>
								Категория
								{sortBy === 'category' &&
									(sortOrder === 'asc' ? (
										<ChevronUpIcon className="inline ml-1" />
									) : (
										<ChevronDownIcon className="inline ml-1" />
									))}
							</TableHead>
							<TableHead onClick={() => handleSort('createdAt')}>
								Дата создания
								{sortBy === 'createdAt' &&
									(sortOrder === 'asc' ? (
										<ChevronUpIcon className="inline ml-1" />
									) : (
										<ChevronDownIcon className="inline ml-1" />
									))}
							</TableHead>
							<TableHead onClick={() => handleSort('price')}>
								Цена (₽)
								{sortBy === 'price' &&
									(sortOrder === 'asc' ? (
										<ChevronUpIcon className="inline ml-1" />
									) : (
										<ChevronDownIcon className="inline ml-1" />
									))}
							</TableHead>
							<TableHead className="text-right">Действия</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredProducts?.map(product => (
							<TableRow key={product.id}>
								<TableCell className="max-w-50 truncate">{product.title || '[Без названия]'}</TableCell>
								<TableCell>{product.status}</TableCell>
								<TableCell>
									<UserToolTip profile={product.user} />
								</TableCell>

								<TableCell className="truncate max-w-20">
									{product.category?.title || '[Без категории]'}
								</TableCell>
								<TableCell>
									<Tooltip>
										<TooltipTrigger className="cursor-pointer p-0 m-0 font-bold">
											<Calendar className="mr-2 h-4 w-4 mb-1 inline" />{' '}
											{new Date(product.createdAt).toLocaleDateString()}
										</TooltipTrigger>
										<TooltipContent className="text-center">
											<Pen className="mr-2 h-3 w-3 inline" /> Последнее изменение <br />
											{product.updatedAt.toLocaleDateString()} -{product.updatedAt.toLocaleTimeString()}
										</TooltipContent>
									</Tooltip>
								</TableCell>

								<TableCell>{product.price?.toFixed(2) || '[Без цены]'}</TableCell>
								<TableCell className="text-right">
									<Button className="mr-2" variant="outline" title="Просмотр" size="icon">
										<Link href={'/catalog/' + product.id}>
											<Eye className="h-4 w-4" />
										</Link>
									</Button>

									<Button variant="outline" size="icon">
										<Link href={`/admin/product/${product.id}`}>
											<Edit className="h-4 w-4" />
										</Link>
									</Button>
									<Button
										className="ml-2"
										variant="destructive"
										onClick={() =>
											product.status === ProductStatus.PUBLISHED
												? confirm('Вы уверены? Статус записи ' + product.status) && deleteProduct(product.id)
												: deleteProduct(product.id)
										}
										size="icon"
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				{filteredProducts?.length === 0 && (
					<div className="flex flex-col items-center m-8">
						<p>Ничего не найдено..</p>
						<Button
							className="mx-auto mt-4"
							variant="outline"
							onClick={createProduct}
							disabled={isPendingCreate}
						>
							Добавить продукт <PlusSquare className="ml-2 h-4 w-4" />
						</Button>
					</div>
				)}
			</div>
		</main>
	)
}
