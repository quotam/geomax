import { productQueries } from '@front/entities/product/_queries'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useProductCat = () => {
	const { data, refetch, isFetching } = useQuery(productQueries.getCategories)
	const { mutateAsync: createCat } = useMutation(productQueries.createCategory(refetch))
	const { mutateAsync: deleteCat } = useMutation(productQueries.deleteCategory(refetch))

	return {
		data: data?.map(({ id, title }) => ({ value: id, label: title })),
		isFetching,
		createCat,
		deleteCat
	}
}
