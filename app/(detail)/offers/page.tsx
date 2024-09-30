'use client'
import { Badge } from '@front/shared/ui/badge'
import { Button } from '@front/shared/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@front/shared/ui/card'
import Image from 'next/image'
import { useState } from 'react'

const seasonalOffers = [
	{
		id: 1,
		title: 'Летняя распродажа навигаторов',
		description: 'Скидки до 30% на все морские навигаторы',
		season: 'Лето',
		image: '/placeholder.svg',
		endDate: '2024-08-31',
		discount: '30%',
		code: 'SUMMER30'
	},
	{
		id: 2,
		title: 'Осенний комплект для яхтинга',
		description: 'Специальное предложение: навигатор + эхолот со скидкой 25%',
		season: 'Осень',
		image: '/placeholder.svg',
		endDate: '2024-11-30',
		discount: '25%',
		code: 'AUTUMN25'
	},
	{
		id: 3,
		title: 'Зимнее хранение лодок',
		description:
			'Забронируйте место для зимнего хранения лодки и получите скидку 20% на весенное обслуживание',
		season: 'Зима',
		image: '/placeholder.svg',
		endDate: '2025-02-28',
		discount: '20%',
		code: 'WINTER20'
	},
	{
		id: 4,
		title: 'Весенняя подготовка к сезону',
		description:
			'Комплексная проверка и обслуживание вашего судна со скидкой 15%',
		season: 'Весна',
		image: '/placeholder.svg',
		endDate: '2024-05-31',
		discount: '15%',
		code: 'SPRING15'
	}
]

const seasons = ['Все', 'Весна', 'Лето', 'Осень', 'Зима']

export default function SeasonalOffers() {
	const [selectedSeason, setSelectedSeason] = useState('Все')

	const filteredOffers =
		selectedSeason === 'Все'
			? seasonalOffers
			: seasonalOffers.filter(offer => offer.season === selectedSeason)

	return (
		<main className="container px-4 py-20">
			<h1 className="text-3xl font-bold mb-8 text-center">Сезонные предложения</h1>

			<div className="flex flex-wrap justify-center gap-2 mb-12">
				{seasons.map(season => (
					<Button
						key={season}
						variant={selectedSeason === season ? 'secondary' : 'outline'}
						onClick={() => setSelectedSeason(season)}
					>
						{season}
					</Button>
				))}
			</div>

			<div className="grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 gap-6">
				{filteredOffers.map(offer => (
					<Card key={offer.id} className="flex flex-col">
						<CardHeader>
							<Image
								src={offer.image}
								alt={offer.title}
								width={600}
								height={400}
								className="w-full h-48 object-cover rounded-t-lg"
							/>
							<CardTitle className="mt-2">{offer.title}</CardTitle>
							<CardDescription>{offer.description}</CardDescription>
						</CardHeader>
						<CardContent>
							<Badge>{offer.season}</Badge>
							<div className="mt-2">
								<span className="font-bold">Скидка: </span>
								{offer.discount}
							</div>
							<div className="mt-2">
								<span className="font-bold">Код акции: </span>
								{offer.code}
							</div>
						</CardContent>
						<CardFooter className="mt-auto">
							<Button className="w-full">Воспользоваться предложением</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</main>
	)
}
