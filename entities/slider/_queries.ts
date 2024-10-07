import { queryOptions, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
	sliderCreateAction,
	sliderDeleteAction,
	sliderGetAllAction,
	sliderGetAllAdminAction,
	sliderGetOneAction,
	sliderUpdateAction
} from './_action'
import { SliderUpdateDto } from './_domain'

const serviceTag = 'slider'

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
				toast('Слайд добавлен', {
					action: {
						label: 'Просмотр',
						onClick: () => router.push('/admin/slider/' + id)
					}
				})
				refetch?.()
			}
		}
	}

	update = () => {
		const queryClient = useQueryClient()
		return {
			mutationKey: [serviceTag, 'update'],
			mutationFn: (dto: SliderUpdateDto) => sliderUpdateAction(dto),
			onSuccess: (id: string) => {
				queryClient.refetchQueries({
					queryKey: [this.getAll.queryKey, this.getAllAdmin.queryKey]
				})
				queryClient.resetQueries({
					queryKey: this.getOne(id).queryKey
				})

				toast.success('Cлайд обновлен')
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
				toast.success('Cлайд удален')
				refetch?.()
			}
		}
	}
}

export const sliderQueries = new SliderQueries()
