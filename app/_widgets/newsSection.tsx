import { articleService } from '@front/entities/article/_service'
import { Button } from '@front/shared/ui/button'
import { Card, CardContent, CardFooter } from '@front/shared/ui/card'
import JSONContentRenderer from '@front/shared/ui/contentRender'
import { ArrowRight, Calendar } from 'lucide-react'
import Link from 'next/link'

export default async function EnhancedNewsSection() {
	const data = await articleService('NEWS').getPreview()
	if (data.length > 2)
		return (
			<section className="mt-32 sm:mt-16">
				<div className="container">
					<h4 className="text-3xl font-bold text-center mb-12">Последние новости</h4>

					<div className="grid gap-8 md:px-4 sm:grid-cols-1 md:grid-cols-2 grid-cols-3">
						{data.map(news => (
							<Card
								key={news.id}
								className="overflow-hidden relative transition-all hover:shadow-lg"
							>
								<CardContent className="p-6">
									<h3 className="text-xl font-bold mb-2 line-clamp-2">{news.title}</h3>
									<div className="text-muted-foreground line-clamp-3">
										<JSONContentRenderer content={news.body} />
									</div>
								</CardContent>
								<CardFooter className="p-6 pt-0 flex justify-between items-center">
									<div className="flex items-center text-sm text-muted-foreground">
										<Calendar className="mr-1 h-4 w-4" />
										{new Date(news.createdAt).toLocaleDateString('ru-RU', {
											year: 'numeric',
											month: 'long',
											day: 'numeric'
										})}
									</div>
									<Button variant="ghost" size="sm">
										<Link href={`/news/${news.id}`} className="flex items-center">
											Подробнее
											<ArrowRight className="ml-2 h-4 w-4" />{' '}
										</Link>
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
	return null
}
