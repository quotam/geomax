import NotFound from '@front/app/not-found'
import { articleService } from '@front/entities/article/_service'
import { cn } from '@front/shared/lib/utils'
import { Card, CardContent, CardFooter, CardHeader } from '@front/shared/ui/card'
import JSONContentRenderer from '@front/shared/ui/contentRender'
import AppShareModal from '@front/shared/ui/shareModal'
import { Calendar } from 'lucide-react'
import Image from 'next/image'

export const generateMetadata = async ({ params }: { params: { id: string } }) => {
	const data = await articleService('PROJECT').getOne(params.id)
	if (!data) return { title: 'Страница не найдена' }

	return {
		title: data.title,
		keywords: data.meta
	}
}

export const generateStaticParams = async () => {
	const data = await articleService('PROJECT').getAll()
	return data.map(item => ({
		id: item.id
	}))
}

export default async function NewsPage({ params }: { params: { id: string } }) {
	const data = await articleService('PROJECT').getOne(params.id)
	if (!data) return <NotFound />

	return (
		<div className="container py-12 px-4">
			<Card className="mx-auto max-w-[120rem] bg-white shadow-xl">
				<CardHeader>
					<h1 className="text-3xl font-bold text-gray-900 mb-2">{data.title}</h1>
					<div className="flex items-center space-x-4">
						<div>
							<div className="flex items-center text-sm text-gray-500">
								<Calendar className="mr-1 h-4 w-4" />
								<time dateTime={new Date(data.createdAt).toLocaleDateString()}>
									{new Date(data.createdAt).toLocaleDateString()}
								</time>
							</div>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<Image
						src={data.image || '/placeholder.svg'}
						alt="presentation"
						loading="lazy"
						width={1000}
						height={500}
						className={cn('w-full h-auto object-cover rounded-lg mb-6', !data.image && 'max-h-100')}
					/>
					<div className="prose max-w-none">
						<JSONContentRenderer content={data.body} />
					</div>
				</CardContent>
				<CardFooter className="flex flex-wrap justify-between items-center">
					<div className="flex  space-x-2">
						<AppShareModal />
					</div>
				</CardFooter>
			</Card>
		</div>
	)
}
