'use client'
import { useState } from 'react'
import { Button } from '@front/shared/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@front/shared/ui/card'
import { Badge } from '@front/shared/ui/badge'
import { Input } from '@front/shared/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@front/shared/ui/select'
import Image from 'next/image'

const newsItems = [
	{
		id: 1,
		title: 'Новый прорыв в морской навигации',
		content:
			'Компания OceanTech представила революционную систему навигации, использующую искусственный интеллект для прогнозирования погодных условий и оптимизации маршрутов.',
		category: 'Технологии',
		date: '2024-03-15',
		image: '/placeholder.svg'
	},
	{
		id: 2,
		title: "Международная регата 'Голубая лента' объявляет даты на 2024 год",
		content:
			"Организаторы всемирно известной регаты 'Голубая лента' анонсировали даты проведения соревнований в 2024 году. Ожидается участие рекордного числа яхтсменов.",
		category: 'События',
		date: '2024-03-10',
		image: '/placeholder.svg'
	},
	{
		id: 3,
		title: 'Экологическая инициатива по очистке океанов набирает обороты',
		content:
			'Международная группа экологов запустила масштабный проект по очистке океанов от пластика с использованием инновационных технологий фильтрации воды.',
		category: 'Экология',
		date: '2024-03-05',
		image: '/placeholder.svg'
	},
	{
		id: 4,
		title: 'Новые правила безопасности для малых судов вступают в силу',
		content:
			'С 1 июня 2024 года вступают в силу обновленные правила безопасности для малых судов, включающие обязательное использование новейших систем связи и навигации.',
		category: 'Законодательство',
		date: '2024-02-28',
		image: '/placeholder.svg'
	},
	{
		id: 5,
		title: 'Открытие нового морского заповедника в Тихом океане',
		content:
			'Правительства нескольких стран объявили о создании крупнейшего в мире морского заповедника в центральной части Тихого океана для защиты уникальной экосистемы.',
		category: 'Экология',
		date: '2024-02-20',
		image: '/placeholder.svg'
	}
]

const categories = [
	'Все',
	'Технологии',
	'События',
	'Экология',
	'Законодательство'
]

export default function NewsPage() {
	const [currentPage, setCurrentPage] = useState(1)
	const [selectedCategory, setSelectedCategory] = useState('Все')
	const [searchTerm, setSearchTerm] = useState('')
	const itemsPerPage = 3

	const filteredNews = newsItems.filter(
		item =>
			(selectedCategory === 'Все' || item.category === selectedCategory) &&
			(item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.content.toLowerCase().includes(searchTerm.toLowerCase()))
	)

	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const currentItems = filteredNews.slice(indexOfFirstItem, indexOfLastItem)

	const totalPages = Math.ceil(filteredNews.length / itemsPerPage)

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber)
	}

	return (
		<main className="container px-4 py-20">
			<h1 className="text-3xl font-bold mb-8 text-center">Новости</h1>

			<div className="flex md:flex-col justify-center flex-row gap-4 mb-12">
				<Input
					type="search"
					placeholder="Поиск новостей..."
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					className=""
				/>
				<Select value={selectedCategory} onValueChange={setSelectedCategory}>
					<SelectTrigger className="w-1/3">
						<SelectValue placeholder="Выберите категорию" />
					</SelectTrigger>
					<SelectContent>
						{categories.map(category => (
							<SelectItem key={category} value={category}>
								{category}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className="grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 gap-6">
				{currentItems.map(item => (
					<Card key={item.id} className="flex flex-col">
						<CardHeader>
							<Image
								src={item.image}
								alt={item.title}
								width={600}
								height={400}
								className="w-full h-48 object-cover rounded-t-lg"
							/>
							<CardTitle className="mt-2">{item.title}</CardTitle>
							<CardDescription>
								{new Date(item.date).toLocaleDateString()}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Badge>{item.category}</Badge>
							<p className="mt-2">{item.content}</p>
						</CardContent>
						<CardFooter className="mt-auto">
							<Button variant="outline" className="w-full">
								Читать полностью
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>

			{totalPages > 1 && (
				<div className="flex justify-center mt-8">
					{Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
						<Button
							key={page}
							variant={currentPage === page ? 'default' : 'outline'}
							className="mx-1"
							onClick={() => handlePageChange(page)}
						>
							{page}
						</Button>
					))}
				</div>
			)}
		</main>
	)
}
