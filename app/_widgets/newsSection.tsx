import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar } from 'lucide-react'
import { Button } from '@front/shared/ui/button'
import { Card, CardContent, CardFooter } from '@front/shared/ui/card'

interface NewsItem {
	id: string
	title: string
	excerpt: string
	date: string
	image: string
	category: string
}

const latestNews: NewsItem[] = [
	{
		id: '1',
		title: 'Революционный прорыв в квантовых вычислениях',
		excerpt:
			'Ученые достигли невероятного успеха в создании стабильных кубитов, открывая новые горизонты для квантовых компьютеров.',
		date: '2024-09-28',
		image: '/placeholder.svg',
		category: 'Технологии'
	},
	{
		id: '2',
		title: 'Искусственный интеллект помогает в борьбе с изменением климата',
		excerpt:
			'Новые алгоритмы ИИ позволяют точнее прогнозировать климатические изменения и разрабатывать эффективные стратегии по их смягчению.',
		date: '2024-09-27',
		image: '/placeholder.svg',
		category: 'Экология'
	},
	{
		id: '3',
		title: 'Прорыв в медицине: новая технология регенерации тканей',
		excerpt:
			'Инновационный метод позволяет восстанавливать поврежденные ткани и органы, открывая новые возможности в лечении тяжелых заболеваний.',
		date: '2024-09-26',
		image: '/placeholder.svg',
		category: 'Медицина'
	}
]

export default function EnhancedNewsSection() {
	return (
		<section className="mt-32 sm:mt-16">
			<div className="container">
				<h4 className="text-3xl font-bold text-center mb-12">Последние новости</h4>

				<div className="grid gap-8 md:px-4 sm:grid-cols-1 md:grid-cols-2 grid-cols-3">
					{latestNews.map(news => (
						<Card
							key={news.id}
							className="overflow-hidden relative transition-all hover:shadow-lg"
						>
							<CardContent className="p-6">
								<h3 className="text-xl font-bold mb-2 line-clamp-2">{news.title}</h3>
								<p className="text-muted-foreground line-clamp-3">{news.excerpt}</p>
							</CardContent>
							<CardFooter className="p-6 pt-0 flex justify-between items-center">
								<div className="flex items-center text-sm text-muted-foreground">
									<Calendar className="mr-1 h-4 w-4" />
									{new Date(news.date).toLocaleDateString('ru-RU', {
										year: 'numeric',
										month: 'long',
										day: 'numeric'
									})}
								</div>
								<Button variant="ghost" size="sm">
									Читать далее
									<ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
				<div className="mt-12 text-center">
					<Button asChild size="lg" className="font-bold">
						<Link href="/news" className="inline-flex items-center">
							Все новости
							<ArrowRight className="ml-2 h-5 w-5" />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	)
}
