'use client'

import Loading from '@front/app/loading'
import { articleQueries } from '@front/entities/article/_queries'
import { ArticleType } from '@prisma/client'
import { useMutation, useQuery } from '@tanstack/react-query'

import ArticleList from './ui/articleList'

const ListLayout = ({ entityType }: { entityType: ArticleType }) => {
	const { data, isPending, refetch } = useQuery(articleQueries(entityType).getAllAdmin)
	const { mutateAsync: create, isPending: isPendingCreate } = useMutation(
		articleQueries(entityType).create(refetch)
	)
	const { mutateAsync: deleteArticle } = useMutation(articleQueries(entityType).delete(refetch))

	if (isPending) return <Loading />

	return (
		<main className="px-4 w-full">
			<ArticleList
				entityType={entityType}
				isPendingCreate={isPendingCreate}
				link={(id: string) =>
					`/${entityType.toLowerCase()}/${entityType === ArticleType.FAQ && '#'}${id}`
				}
				articles={data || []}
				createArticle={() => create()}
				deleteArticle={(id: string) => deleteArticle(id)}
			/>
		</main>
	)
}

export default ListLayout
