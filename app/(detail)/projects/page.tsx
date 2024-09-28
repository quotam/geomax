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
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@front/shared/ui/dialog'
import { Badge } from '@front/shared/ui/badge'
import Image from 'next/image'

const projects = [
	{
		id: 1,
		title: 'Морской навигатор Pro',
		description: 'Разработка современной навигационной системы для морских судов',
		category: 'Навигация',
		image: '/placeholder.svg',
		completionDate: '2023-05-15',
		client: 'OceanTech Inc.',
		technologies: ['React Native', 'GPS API', 'Морские карты']
	},
	{
		id: 2,
		title: 'Система управления яхтой',
		description: 'Интегрированная система для управления всеми аспектами яхты',
		category: 'Управление',
		image: '/placeholder.svg',
		completionDate: '2023-08-22',
		client: 'LuxuryYachts Co.',
		technologies: ['IoT', 'React', 'Node.js']
	},
	{
		id: 3,
		title: 'Приложение для рыбалки',
		description: 'Мобильное приложение для отслеживания лучших мест для рыбалки',
		category: 'Мобильные приложения',
		image: '/placeholder.svg',
		completionDate: '2023-03-10',
		client: 'FishFinder Ltd.',
		technologies: ['React Native', 'Google Maps API', 'Weather API']
	},
	{
		id: 4,
		title: 'Система мониторинга двигателя',
		description:
			'Разработка системы для мониторинга состояния морских двигателей',
		category: 'Мониторинг',
		image: '/placeholder.svg',
		completionDate: '2023-11-05',
		client: 'MarineEngines Corp.',
		technologies: ['IoT сенсоры', 'Real-time аналитика', 'Облачное хранение']
	}
]

const categories = [
	'Все',
	'Навигация',
	'Управление',
	'Мобильные приложения',
	'Мониторинг'
]

export default function CompletedProjects() {
	const [selectedCategory, setSelectedCategory] = useState('Все')

	const filteredProjects =
		selectedCategory === 'Все'
			? projects
			: projects.filter(project => project.category === selectedCategory)

	return (
		<main className="container px-4 py-20">
			<h2 className="text-3xl font-bold mb-8 text-center">Выполненные проекты</h2>

			<div className="flex flex-wrap gap-2 justify-center mb-12">
				{categories.map(category => (
					<Button
						key={category}
						variant={selectedCategory === category ? 'secondary' : 'outline'}
						onClick={() => setSelectedCategory(category)}
					>
						{category}
					</Button>
				))}
			</div>

			<div className="grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 gap-6">
				{filteredProjects.map(project => (
					<Card key={project.id} className="flex flex-col">
						<CardHeader>
							<Image
								src={project.image}
								alt={project.title}
								width={600}
								height={400}
								className="w-full h-48 object-cover rounded-t-lg"
							/>
							<CardTitle className="mt-2">{project.title}</CardTitle>
							<CardDescription>{project.description}</CardDescription>
						</CardHeader>
						<CardContent>
							<Badge>{project.category}</Badge>
						</CardContent>
						<CardFooter className="mt-auto">
							<Dialog>
								<DialogTrigger asChild>
									<Button variant="outline">Подробнее</Button>
								</DialogTrigger>
								<DialogContent className="sm:max-w-[425px]">
									<DialogHeader>
										<DialogTitle>{project.title}</DialogTitle>
										<DialogDescription>{project.description}</DialogDescription>
									</DialogHeader>
									<div className="grid gap-4 py-4">
										<Image
											src={project.image}
											alt={project.title}
											width={600}
											height={400}
											className="w-full h-48 object-cover rounded-lg"
										/>
										<div>
											<h4 className="font-bold">Клиент:</h4>
											<p>{project.client}</p>
										</div>
										<div>
											<h4 className="font-bold">Дата завершения:</h4>
											<p>{new Date(project.completionDate).toLocaleDateString()}</p>
										</div>
										<div>
											<h4 className="font-bold">Технологии:</h4>
											<div className="flex flex-wrap gap-2 mt-2">
												{project.technologies.map((tech, index) => (
													<Badge key={index} variant="secondary">
														{tech}
													</Badge>
												))}
											</div>
										</div>
									</div>
								</DialogContent>
							</Dialog>
						</CardFooter>
					</Card>
				))}
			</div>
		</main>
	)
}
