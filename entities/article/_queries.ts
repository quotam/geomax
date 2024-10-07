import { ArticleType } from '@prisma/client'
import { queryOptions, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
	ArticleCreateAdminAction,
	ArticleDeleteAdminAction,
	ArticleGetAllAdminAction,
	ArticleGetOneAction,
	ArticleUpdateAdminAction
} from './_action'
import { useRouter } from 'next/navigation'
import { ArticleUpdateDto } from './_domain/dto'

const serviceTag = 'article'

class ArticleQueries {
	constructor(private readonly type: ArticleType) {}

	getAllAdmin = queryOptions({
		queryKey: [serviceTag, this.type, 'getAll'],
		queryFn: () => ArticleGetAllAdminAction(this.type)
	})

	getOne = (id: string) =>
		queryOptions({
			queryKey: [serviceTag, this.type, 'getOne'],
			queryFn: () => ArticleGetOneAction(this.type, id)
		})

	update = () => {
		const queryClient = useQueryClient()
		return {
			mutationKey: [serviceTag, this.type, 'update'],
			mutationFn: (dto: ArticleUpdateDto) =>
				ArticleUpdateAdminAction(this.type, dto),
			onSuccess: (id: string) => {
				queryClient.refetchQueries({
					queryKey: [this.getAllAdmin.queryKey]
				})
				queryClient.resetQueries({
					queryKey: this.getOne(id).queryKey
				})

				toast.success(this.type.toLowerCase() + ' обновлен')
			}
		}
	}
	delete = (refetch?: () => void) => {
		return {
			mutationKey: [serviceTag, this.type, 'delete'],
			mutationFn: (id: string) => ArticleDeleteAdminAction(this.type, id),
			onSuccess: () => {
				toast.success(this.type + ' удален/a')
				refetch?.()
			}
		}
	}

	create = (refetch?: () => void) => {
		const router = useRouter()
		return {
			mutationKey: [serviceTag, this.type, 'create'],
			mutationFn: () => ArticleCreateAdminAction(this.type),
			onSuccess: (id: string) => {
				toast(this.type + ' добавлен', {
					action: {
						label: 'Просмотр',
						onClick: () => router.push('/admin/' + this.type.toLowerCase() + '/' + id)
					}
				})
				refetch?.()
			}
		}
	}
}

export const articleQueries = (type: ArticleType) => new ArticleQueries(type)
