import Image from 'next/image'

import NotFoundPage from '@front/app/not-found'
import { getDetailPojectService, getProjectListService } from '@front/entities/project/server'
import { Gallery } from '@front/features/imageGallery/pub/Gallery'
import VideoCarousel from '@front/features/videoCarusel/pub/videoCarusel'
import { convertVideosToOGFormat } from '@front/kernel/lib/metaHelpers'
import { MdxCode } from '@front/shared/lib/mdx'
import { compileMDX } from '@front/shared/lib/mdx/server'
import AppShareModal from '@front/shared/ui/shareModal'

type PageParams = Promise<{
	slug: string
}>

export async function generateMetadata({ params }: { params: PageParams }) {
	const { slug } = await params
	const article = await getDetailPojectService.exec(slug)

	if (!article) {
		return {
			title: '404 | Страница не найдена'
		}
	}

	const siteUrl = process.env.SITE_URL || 'http://localhost:3000'
	const metaTitle = article.title
	const metaDescription = article.metaDescription || article.description
	const metaKeywords = article.metaKeywords || ''
	const mainImage = article.thumbnail ? siteUrl + article.imagePath + article.thumbnail : ''

	const ogVideos = convertVideosToOGFormat(article.videos)

	return {
		title: metaTitle,
		description: metaDescription,
		keywords: metaKeywords.split(',').map(k => k.trim()) || [],

		openGraph: {
			title: metaTitle,
			description: metaDescription,
			type: 'article',
			url: `${siteUrl}/projects/${article.slug}`,
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
			videos: ogVideos
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
	const data = await getProjectListService.exec()

	return data.map(item => ({
		slug: item.slug
	}))
}

export default async function ProjectPage({ params }: { params: PageParams }) {
	const { slug } = await params

	const data = await getDetailPojectService.exec(slug)

	if (!data) return <NotFoundPage />

	const compiled = {
		...data,
		description: await compileMDX(data.description).then(r => r.code),
		body: await compileMDX(data.body).then(r => r.code)
	}

	return (
		<div className="container py-12 px-4 sm:px-2">
			<article className="max-w-[120rem] mx-auto">
				<section className="mb-8">
					<div className="flex items-center justify-between flex-wrap">
						<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-2">{compiled.title}</h1>
						<AppShareModal className="mb-2" />
					</div>

					{compiled.date && (
						<time dateTime={compiled.date} className="text-muted-foreground block mb-4">
							{compiled.date}
						</time>
					)}

					{compiled.description && (
						<MdxCode code={compiled.description} imagePath={compiled.imagePath} />
					)}
				</section>

				{compiled.thumbnail && (
					<div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
						<Image
							src={compiled.imagePath + compiled.thumbnail}
							alt={compiled.title}
							fill
							className="object-cover"
							priority
						/>
					</div>
				)}

				<div className="mb-8">
					<MdxCode code={compiled.body} size="lg" imagePath={compiled.imagePath} />
				</div>

				{compiled.videos && compiled.videos.length > 0 && (
					<section className="my-12 not-prose">
						<h2 className="text-2xl font-bold mb-6">Видео</h2>
						<div className="bg-muted/30 p-6 rounded-lg">
							<VideoCarousel videos={compiled.videos} />
						</div>
					</section>
				)}

				{compiled.images && compiled.images.length > 0 && (
					<section className="my-12 not-prose">
						<h2 className="text-2xl font-bold mb-6">Фотографии</h2>
						<Gallery images={compiled.images.map(img => compiled.imagePath + img)} alt={compiled.title} />
					</section>
				)}
			</article>
		</div>
	)
}
