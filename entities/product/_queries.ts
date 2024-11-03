import { queryOptions, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import {
	PoductCreateAction,
	ProductAdminGetAllAction,
	ProductCteateCategoryAction,
	ProductCteateFacturerAction,
	ProductDeleteAction,
	ProductDeleteCategoryAdminAction,
	ProductDeleteFacturerAdminAction,
	ProductGetAdminCategoryes,
	ProductGetAdminFactureres,
	ProductGetOnceAdminQuery,
	ProductGetOnceQuery,
	ProductUpdateAction
} from './_action'
import { UpdateProductDto } from './_domain'

const serviceTag = 'product'

class ProductQueryes {
	delete = (refetch?: () => void) => ({
		mutationFn: (id: string) => ProductDeleteAction(id),
		onSuccess: (id: string) => {
			toast.success('Продукт ' + id + ' удален')
			refetch?.()
		}
	})

	getOnceAdmin = (id: string) =>
		queryOptions({
			queryKey: [serviceTag, 'getOnceAdmin', id],
			queryFn: () => ProductGetOnceAdminQuery(id)
		})

	getOnce = (id: string) =>
		queryOptions({
			queryKey: [serviceTag, 'getOnce', id],
			queryFn: () => ProductGetOnceQuery(id)
		})

	create = (refetch?: () => void) => {
		const router = useRouter()
		return {
			mutationFn: () => PoductCreateAction(),
			onSuccess: (id: string) => {
				toast('Продукт добавлен', {
					action: {
						label: 'Просмотр',
						onClick: () => router.push('/admin/product/' + id)
					}
				})
				refetch?.()
			}
		}
	}

	getAllAdmin = queryOptions({
		queryKey: [serviceTag, 'getAllAdmin'],
		queryFn: () => ProductAdminGetAllAction()
	})

	update = () => {
		const queryClient = useQueryClient()
		return {
			mutationFn: (dto: UpdateProductDto) => ProductUpdateAction(dto),
			onSuccess: (id: string) => {
				queryClient.refetchQueries({
					queryKey: [this.getAllAdmin.queryKey]
				})
				queryClient.resetQueries({
					queryKey: this.getOnceAdmin(id).queryKey
				})
				toast.success('Продукт обновлен')
			}
		}
	}

	getFacturers = queryOptions({
		queryKey: [serviceTag, 'getCategories facturer'],
		queryFn: () => ProductGetAdminFactureres()
	})

	deleteFacturer = (refetch?: () => void) => ({
		mutationKey: [serviceTag, 'delete Category facturer'],
		mutationFn: (id: string) => ProductDeleteFacturerAdminAction(id),
		onSuccess: ({ title }: { title: string }) => {
			toast.success('Категория ' + title + ' удалена')
			refetch?.()
		}
	})

	createFacturer = (refetch?: () => void) => ({
		mutationKey: [serviceTag, 'create Category facturer'],
		mutationFn: (title: string) => ProductCteateFacturerAction(title),
		onSuccess: ({ title }: { title: string }) => {
			toast.success('Категория ' + title + ' создана')
			refetch?.()
		}
	})

	getCategories = queryOptions({
		queryKey: [serviceTag, 'getCategories'],
		queryFn: () => ProductGetAdminCategoryes()
	})

	deleteCategory = (refetch?: () => void) => ({
		mutationKey: [serviceTag, 'delete Category'],
		mutationFn: (id: string) => ProductDeleteCategoryAdminAction(id),
		onSuccess: ({ title }: { title: string }) => {
			toast.success('Категория ' + title + ' удалена')
			refetch?.()
		}
	})

	createCategory = (refetch?: () => void) => ({
		mutationKey: [serviceTag, 'create Category'],
		mutationFn: (title: string) => ProductCteateCategoryAction(title),
		onSuccess: ({ title }: { title: string }) => {
			toast.success('Категория ' + title + ' создана')
			refetch?.()
		}
	})
}

export const productQueries = new ProductQueryes()
