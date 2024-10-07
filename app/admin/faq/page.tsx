'use client'

import Loading from '@front/app/loading'
import { articleQueries } from '@front/entities/article/_queries'
import ArticleList from '@front/features/cms/articleList'
import { ArticleType } from '@prisma/client'
import { useMutation, useQuery } from '@tanstack/react-query'

const entityType = ArticleType.FAQ

export default function NewsAdmin() {
	const { data, isPending, refetch } = useQuery(
		articleQueries(entityType).getAllAdmin
	)
	const { mutateAsync: create, isPending: isPendingCreate } = useMutation(
		articleQueries(entityType).create(refetch)
	)
	const { mutateAsync: deleteArticle } = useMutation(
		articleQueries(entityType).delete(refetch)
	)

	if (isPending) return <Loading />

	return (
		<main className="p-4 w-full">
			<ArticleList
				entityType={entityType}
				isPendingCreate={isPendingCreate}
				articles={data || []}
				createArticle={() => create()}
				deleteArticle={(id: string) => deleteArticle(id)}
			/>
		</main>
	)
}
