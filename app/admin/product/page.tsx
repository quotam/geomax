'use client'
import Loading from '@front/app/loading'
import { productQueries } from '@front/entities/product/_queries'
import ProductList from '@front/features/cms/productList'
import { useMutation, useQuery } from '@tanstack/react-query'

export default function AdminProductList() {
	const { data, isPending, refetch } = useQuery(productQueries.getAllAdmin)

	const { mutate: createProduct, isPending: isPendingCreate } = useMutation(
		productQueries.create(refetch)
	)
	const { mutate: deleteProduct } = useMutation(productQueries.delete(refetch))

	if (isPending) return <Loading />

	return (
		<ProductList
			isPendingCreate={isPendingCreate}
			createProduct={createProduct}
			deleteProduct={deleteProduct}
			initialProducts={data}
		/>
	)
}
