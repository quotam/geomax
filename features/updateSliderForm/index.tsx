'use client'

import AppEditor from '@front/entities/editor'
import {
	sliderQueries,
	SliderUpdateDto,
	SliderUpdateSchema
} from '@front/entities/slider'
import { Button } from '@front/shared/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@front/shared/ui/form'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@front/shared/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { SliderStatus } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

const UpdateSliderForm = ({ data }: { data: SliderUpdateDto }) => {
	const form = useForm<SliderUpdateDto>({
		resolver: zodResolver(SliderUpdateSchema),
		defaultValues: {
			id: data.id,
			status: data.status,
			body: data.body
		}
	})

	const { mutateAsync, isPending: isPendingUpdate } = useMutation(
		sliderQueries.update()
	)

	function onSubmit(values: SliderUpdateDto) {
		mutateAsync(values)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 border mx-auto p-6 bg-white rounded-lg shadow-md"
			>
				<h1 className="text-2xl font-bold mb-4">Редактирование слайда</h1>
				<FormField
					control={form.control}
					name="status"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Статус</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Выберите статус" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{Object.values(SliderStatus).map(status => (
										<SelectItem key={status} value={status}>
											{status}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormDescription>Выберите текущий статус.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="body"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Содержимое слайда</FormLabel>
							<FormControl>
								<AppEditor
									initialValue={data?.body ? JSON.parse(data.body) : undefined}
									onChange={e => field.onChange(JSON.stringify(e))}
								/>
							</FormControl>
							<FormDescription>Введите дополнительный текст.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button disabled={isPendingUpdate} type="submit">
					Обновить
				</Button>
			</form>
		</Form>
	)
}

export default UpdateSliderForm
