import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getDetailProductService, getProductListService } from '@front/entities/product/server'
import { Gallery } from '@front/features/imageGallery/pub/Gallery'
import OrderButt from '@front/features/orderButt'
import VideoCarousel from '@front/features/videoCarusel/pub/videoCarusel'
import { convertVideosToOGFormat } from '@front/kernel/lib/metaHelpers'
import { MdxCode } from '@front/shared/lib/mdx'
import { compileMDX } from '@front/shared/lib/mdx/server'
import { PriceToRub } from '@front/shared/lib/utils'
import { Badge } from '@front/shared/ui/badge'
import { Separator } from '@front/shared/ui/separator'
import AppShareModal from '@front/shared/ui/shareModal'
import { ArrowLeft, Check, X } from 'lucide-react'

type PageParams = Promise<{
	slug: string
}>

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
	const { slug } = await params
	const product = await getDetailProductService.exec(slug)

	if (!product) {
		return {
			title: '404 | Страница не найдена'
		}
	}

	const siteUrl = process.env.SITE_URL || 'http://localhost:3000'
	const metaTitle = product.title
	const metaDescription = product.metaDescription || product.description
	const metaKeywords = product.metaKeywords || ''
	const mainImage = product.thumbnail ? siteUrl + product.imagePath + product.thumbnail : ''

	const ogVideos = convertVideosToOGFormat(product.videos)

	return {
		title: metaTitle,
		description: metaDescription,
		keywords: metaKeywords.split(',').map(k => k.trim()) || [],

		openGraph: {
			title: metaTitle,
			description: metaDescription,
			type: 'article',
			url: `${siteUrl}/products/${product.slug}`,
			images: mainImage
				? [
						{
							url: mainImage,
							width: 1200,
							height: 630,
							alt: metaTitle
						}
					]
				: [],
			videos: ogVideos,
			// Check for both undefined and null
			...(product.price != null && {
				product: {
					price: {
						amount: product.price.toString(),
						currency: 'RUB'
					},
					availability: product.avability !== false ? 'В наличии' : 'Нет в наличии',
					...(product.facturer && { brand: product.facturer.title }),
					...(product.categories && {
						category: product.categories.map(c => c.title).join(', ')
					})
				}
			})
		},
		twitter: {
			card: 'summary_large_image',
			title: metaTitle,
			description: metaDescription,
			images: mainImage ? [mainImage] : []
		}
	}
}

export const generateStaticParams = async () => {
	const data = await getProductListService.exec()

	return data.map(item => ({
		slug: item.slug
	}))
}

export default async function ProductPage({ params }: { params: PageParams }) {
	const { slug } = await params
	const product = await getDetailProductService.exec(slug)

	const compiled = {
		...product,
		avability: product.avability === false ? false : true,
		description: await compileMDX(product.description).then(r => r.code),
		body: await compileMDX(product.body).then(r => r.code)
	}

	if (!product) {
		notFound()
	}

	// Combine the main image with additional images
	const allImages = compiled.images?.map(e => product.imagePath + e)

	return (
		<div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 overflow-y-auto">
			<div className="min-h-screen flex items-center justify-center p-4 sm:p-2">
				<div className="relative bg-background rounded-lg shadow-lg w-full max-w-[120rem] border">
					{/* Header with back button */}
					<div className="flex items-center justify-between p-4 sm:py-2 border-b">
						<Link href="/catalog" className="flex items-center text-sm font-medium">
							<ArrowLeft className="mr-2 h-4 w-4" />
							Каталог
						</Link>
						<Link href="/catalog" className="rounded-full p-1.5 hover:bg-muted">
							<X className="h-5 w-5" />
							<span className="sr-only">Close</span>
						</Link>
					</div>

					{/* Product content */}
					<div className="grid grid-cols-2 sm:grid-cols-1 gap-6 p-6 sm:gap-2 sm:p-2">
						<div>
							{allImages && allImages.length > 0 && (
								<Gallery variant="product" images={allImages} alt={compiled.title} />
							)}
						</div>

						{/* Product details */}
						<div className="flex flex-col">
							{/* Title and manufacturer */}
							<div className="mb-4">
								{compiled.facturer && (
									<Link href={`/manufacturers/${compiled.facturer.slug}`}>
										<Badge variant="outline" className="mb-2">
											{compiled.facturer.title}
										</Badge>
									</Link>
								)}
								<h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
							</div>

							{/* Price and availability */}
							<div className="flex items-center justify-between mb-6">
								{compiled.price !== undefined && (
									<span className="text-3xl font-bold">{PriceToRub(compiled.price)}</span>
								)}
								<div className="flex items-center">
									{compiled.avability ? (
										<Badge
											variant="outline"
											className="bg-green-50 text-green-700 border-green-200 flex items-center"
										>
											<Check className="mr-1 h-3 w-3" /> В наличии{' '}
										</Badge>
									) : (
										<Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
											Нет в наличии
										</Badge>
									)}
								</div>
							</div>

							{/* Short description */}
							<MdxCode code={compiled.description} imagePath={compiled.imagePath} />

							{/* Add to cart button */}
							<div className="flex w-full my-2">
								<OrderButt productId={compiled.id} />
								<AppShareModal className="ml-2 h-full" />
							</div>

							{compiled.categories && compiled.categories.length > 0 && (
								<div className="mb-6">
									<h3 className="text-sm font-medium mb-2">Категории</h3>
									<div className="flex flex-wrap gap-2">
										{compiled.categories.map(category => (
											<Link key={category.id} href={`/categories/${category.slug}`}>
												<Badge variant="secondary">{category.title}</Badge>
											</Link>
										))}
									</div>
								</div>
							)}

							<Separator className="my-6" />
						</div>
					</div>
					<div className="p-6 sm:p-2">
						<h2 className="text-xl font-bold mb-4">Описание</h2>
						<MdxCode code={compiled.body} imagePath={compiled.imagePath} />
						{product.videos && product.videos.length > 0 && (
							<div className="mt-6">
								<h3 className="text-lg font-medium mb-3">Видео</h3>
								<div className="grid gap-4">
									<VideoCarousel videos={product.videos} />
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
