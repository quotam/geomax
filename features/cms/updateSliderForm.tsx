'use client'

import AppEditor from '@front/entities/editor'
import { SliderUpdateDto, SliderUpdateSchema, sliderQueries } from '@front/entities/slider'
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
import React from 'react'
import { useForm } from 'react-hook-form'

const UpdateSliderForm = ({
	data,
	isPending
}: {
	data?: SliderUpdateDto | null
	isPending: boolean
}) => {
	const form = useForm<SliderUpdateDto>({
		resolver: zodResolver(SliderUpdateSchema)
	})

	const { mutateAsync, isPending: isPendingUpdate } = useMutation(sliderQueries.update())

	React.useEffect(() => {
		if (data) form.reset(data)
	}, [data, form])

	function onSubmit(values: SliderUpdateDto) {
		mutateAsync(values)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={`space-y-8 bg-card border mx-auto p-6 bg-white rounded-lg shadow-md ${isPending && 'animate-pulse bg-secondary/5'}`}
			>
				<h1 className="text-2xl font-bold mb-4">Редактирование слайда</h1>
				<FormField
					control={form.control}
					name="status"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Статус</FormLabel>
							<Select onValueChange={field.onChange} value={field.value}>
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
									key={field.value?.slice(0, 10)}
									className="bg-foreground text-background p-0 w-full"
									initialValue={field.value && JSON.parse(field.value)}
									onChange={e => field.onChange(JSON.stringify(e))}
								/>
							</FormControl>
							<FormDescription>Введите дополнительный текст.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button disabled={isPendingUpdate || isPending} type="submit">
					Обновить
				</Button>
			</form>
		</Form>
	)
}

export default UpdateSliderForm
