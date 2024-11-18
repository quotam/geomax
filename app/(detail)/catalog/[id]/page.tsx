import NotFound from '@front/app/not-found'
import { productService } from '@front/entities/product/_service'
import OrderButt from '@front/features/orderButt'
import { privateConfig } from '@front/shared/config/privateConfig'
import { PriceToRub, cn } from '@front/shared/lib/utils'
import { Badge } from '@front/shared/ui/badge'
import { Card, CardContent } from '@front/shared/ui/card'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from '@front/shared/ui/carousel'
import JSONContentRenderer from '@front/shared/ui/contentRender'
import AppShareModal from '@front/shared/ui/shareModal'
import Image from 'next/image'

export async function generateMetadata({ params }: { params: { id: string } }) {
	const data = await productService.getOnce(params.id)
	if (!data || data.status !== 'PUBLISHED') return { title: 'Страница не найдена' }

	const images = data.images.map((image: string) => `${privateConfig.NEXTAUTH_URL}${image}`) || [
		`${privateConfig.NEXTAUTH_URL}/placeholder.svg`
	]

	return {
		title: data.title,
		keywords: data.meta,
		description: data.mataDesc,
		openGraph: {
			title: data.title,
			description: data.mataDesc,
			images
		},
		twitter: {
			card: 'summary_large_image',
			title: data.title,
			description: data.mataDesc,
			images
		}
	}
}

export const generateStaticParams = async () => {
	const data = await productService.getAll()
	return data.map(item => ({
		id: item.id
	}))
}

export default async function ProductPages({ params }: { params: { id: string } }) {
	const data = await productService.getOnce(params.id)
	if (!data || data.status !== 'PUBLISHED') return <NotFound />

	return (
		<main className="container py-12 px-4">
			<Card className="mx-auto shadow-xl max-w-[120rem]">
				<div className="flex relative justify-between sm:flex-col-reverse p-6">
					{data.images.length > 0 ? (
						<Carousel className="relative w-3/5 sm:w-full rounded-lg overflow-hidden">
							<CarouselContent>
								{data.images?.map((img, index) => (
									<CarouselItem
										className="flex aspect-[3/2] items-center relative justify-center p-0"
										key={index}
									>
										<Image
											src={img || '/placeholder.svg'}
											alt="presentation"
											width={800}
											height={400}
											className={cn('w-full h-auto rounded-lg object-cover')}
										/>
									</CarouselItem>
								))}
							</CarouselContent>
							<div className="right-8 flex gap-4 bottom-2 absolute">
								<CarouselPrevious className="rounded-lg" variant="secondary" />
								<CarouselNext variant="secondary" className="rounded-lg" />
							</div>
						</Carousel>
					) : (
						<Image
							src="/placeholder.svg"
							alt="presentation"
							width={800}
							height={400}
							className="w-3/5 h-100 object-cover sm:w-full rounded-lg"
						/>
					)}

					<div className="w-2/5 ml-6 sm:ml-0 sm:mb-6 sm:w-full">
						<h1 className="text-2xl font-bold mb-2">{data.title}</h1>
						<div className="border-b pb-4 my-4">
							{data.price && (
								<div className="flex items-baseline mb-2">
									<span className="text-3xl font-bold">{PriceToRub(data.price)}</span>
								</div>
							)}
							<Badge variant={data.availability ? 'default' : 'secondary'} className="mb-2">
								{data.availability ? 'В наличии' : 'Нет в наличии'}
							</Badge>
						</div>
						{data.facturer && (
							<p className="mb-2">
								<span className="font-bold">Производитель:</span> {data.facturer.title}
							</p>
						)}{' '}
						{data.category && (
							<p className="mb-4">
								<span className="font-bold">Категория:</span> {data.category.title}
							</p>
						)}{' '}
						<div>
							<JSONContentRenderer content={data.desc} />
						</div>
						<div className="flex justify-end gap-4 mt-6">
							<AppShareModal />
							<OrderButt product={`${data.title} - артикул: ${data.id}`} />
						</div>
					</div>
				</div>
				<CardContent>
					<div className="prose max-w-none">
						<JSONContentRenderer content={data.body} />
					</div>
				</CardContent>
			</Card>
		</main>
	)
}
