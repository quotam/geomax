'use client'

import Loading from '@front/app/loading'
import NotFoundPage from '@front/app/not-found'
import { articleQueries } from '@front/entities/article/_queries'
import UpdateArticleForm from '@front/features/cms/updateArticleForm'
import { Button } from '@front/shared/ui/button'
import { ArticleType } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const entityType = ArticleType.FAQ

export default function NewsEditePage({ params }: { params: { id: string } }) {
	const { data, isLoading } = useQuery(
		articleQueries(entityType).getOne(params.id)
	)

	if (isLoading) return <Loading />
	if (!data) return <NotFoundPage />

	return (
		<div className="container mx-auto p-4">
			<Link href={'/admin/' + entityType.toLowerCase()}>
				<Button variant="ghost" className="mb-4">
					<ArrowLeft className="mr-2 h-4 w-4" />
					Назад к списку {entityType.toLowerCase()}
				</Button>
			</Link>
			<UpdateArticleForm
				data={{ ...data, categoryId: data.category?.id }}
				entityType={entityType}
			/>
		</div>
	)
}
