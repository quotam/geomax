'use client'

import NotFoundPage from '@front/app/not-found'
import { articleQueries } from '@front/entities/article/_queries'
import { Button } from '@front/shared/ui/button'
import { ArticleType } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import UpdateArticleForm from './ui/updateArticleForm'

const FormLayout = ({ entityType, id }: { entityType: ArticleType; id: string }) => {
	const { data, isPending } = useQuery({
		...articleQueries(entityType).getOne(id)
	})

	if (!isPending && !data) return <NotFoundPage />

	return (
		<main className="container mx-auto p-4">
			<Link href={'/admin/' + entityType}>
				<Button variant="ghost" className="mb-4">
					<ArrowLeft className="mr-2 h-4 w-4" />
					Назад к списку {entityType.toLowerCase()}
				</Button>
			</Link>
			<UpdateArticleForm
				isPending={isPending}
				data={data && { ...data, categoryId: data?.category?.id }}
				entityType={entityType}
			/>
		</main>
	)
}

export default FormLayout
