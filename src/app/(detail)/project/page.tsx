import { Metadata } from 'next'

import { getProjectListService } from '@front/entities/project/server'
import { ArticleCard } from '@front/features/articleCard/pub/articleCard'
import { compileMDX } from '@front/shared/lib/mdx/server'

export const metadata: Metadata = {
	title: 'Выполненные проекты',
	description: 'Выполненные проекты'
}

export default async function OfferPage() {
	const data = await getProjectListService.exec()

	const compiled = await Promise.all(
		data.map(async e => ({
			...e,
			description: await compileMDX(e.description).then(r => r.code)
		}))
	)

	return (
		<main className="container py-20 px-15 md:px-10 sm:px-4">
			<h1 className="text-3xl sm:text-2xl font-bold mb-12 text-center">Выполненные проекты</h1>
			<div className="grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 gap-6">
				{compiled.map(item => (
					<ArticleCard article={item} key={item.id} link={`/project/${item.slug}`} />
				))}
			</div>
		</main>
	)
}
