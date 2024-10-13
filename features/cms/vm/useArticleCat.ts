import { articleQueries } from '@front/entities/article/_queries'
import { ArticleType } from '@prisma/client'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useArticleCat = (type: ArticleType) => {
	const { data, refetch, isFetching } = useQuery(
		articleQueries(type).getCategories
	)
	const { mutateAsync: createCat } = useMutation(
		articleQueries(type).createCategory(refetch)
	)
	const { mutateAsync: deleteCat } = useMutation(
		articleQueries(type).deleteCategory(refetch)
	)

	return {
		data: data?.map(({ id, title }) => ({ value: id, label: title })),
		isFetching,
		createCat,
		deleteCat
	}
}
