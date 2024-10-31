import { productQueries } from '@front/entities/product/_queries'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useProductFacturer = () => {
	const { data, refetch, isFetching } = useQuery(productQueries.getFacturers)
	const { mutateAsync: createCat } = useMutation(productQueries.createFacturer(refetch))
	const { mutateAsync: deleteCat } = useMutation(productQueries.deleteFacturer(refetch))

	return {
		data: data?.map(({ id, title }) => ({ value: id, label: title })),
		isFetching,
		createCat,
		deleteCat
	}
}
