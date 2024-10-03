import { queryOptions, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
	sliderCreateAction,
	sliderDeleteAction,
	sliderGetAllAction,
	sliderGetAllAdminAction,
	sliderGetOneAction
} from './_action'
import { serviceTag } from './_domain'

class SliderQueries {
	getAll = queryOptions({
		queryKey: [serviceTag, 'getAll'],
		queryFn: () => sliderGetAllAction()
	})

	getAllAdmin = queryOptions({
		queryKey: [serviceTag, 'getAllAdmin'],
		queryFn: () => sliderGetAllAdminAction()
	})

	getOne = (id: string) =>
		queryOptions({
			queryKey: [serviceTag, 'getOne'],
			queryFn: () => sliderGetOneAction(id)
		})

	create = (refetch?: () => void) => {
		const queryClient = useQueryClient()
		const router = useRouter()
		return {
			mutationKey: [serviceTag, 'create'],
			mutationFn: () => sliderCreateAction(),
			onSuccess: (id: string) => {
				queryClient.invalidateQueries({
					queryKey: this.getAll.queryKey
				})
				toast('CREATED', {
					action: {
						label: 'Просмотр',
						onClick: () => router.push('/admin/slider/' + id)
					}
				})
				refetch?.()
			}
		}
	}

	delete = (refetch?: () => void) => {
		const queryClient = useQueryClient()

		return {
			mutationKey: [serviceTag, 'delete'],
			mutationFn: (id: string) => sliderDeleteAction(id),
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: this.getAll.queryKey
				})
				toast.success('DELETED')
				refetch?.()
			}
		}
	}
}

export const sliderQueries = new SliderQueries()
