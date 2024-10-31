'use client'

import AppEditor from '@front/entities/editor'
import { UpdateProdcutSchema, UpdateProductDto } from '@front/entities/product/_domain'
import { productQueries } from '@front/entities/product/_queries'
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
import { Input } from '@front/shared/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@front/shared/ui/select'
import { Textarea } from '@front/shared/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProductStatus } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'

import GroupSelect from './ui/groupSelect'
import ImageSelector from './ui/imageSelector'
import { useProductCat } from './vm/useProductCat'
import { useProductFacturer } from './vm/useProductFacturer'

const UpdateProductForm = ({
	data,
	isPending
}: {
	data?: UpdateProductDto | null
	isPending: boolean
}) => {
	const form = useForm<UpdateProductDto>({
		resolver: zodResolver(UpdateProdcutSchema)
	})

	const { mutateAsync, isPending: isPendingUpdate } = useMutation(productQueries.update())

	const catOptions = useProductCat()
	const facOptions = useProductFacturer()

	React.useEffect(() => {
		if (data) {
			form.reset(data)
		}
	}, [data, form])

	function onSubmit(values: UpdateProductDto) {
		mutateAsync(values)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={`space-y-8 border mx-auto bg-card p-6 bg-white rounded-lg shadow-md ${isPending && 'animate-pulse bg-secondary/5'}`}
			>
				<h1 className="text-2xl font-bold mb-4">Редактирование продукта</h1>
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-4">
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
											{Object.values(ProductStatus).map(status => (
												<SelectItem key={status} value={status}>
													{status}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Цена (в рублях)</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="Цена"
											value={field.value || undefined}
											onChange={e => field.onChange(Number(e.target.value))}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="availability"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<div className="flex items-center gap-2 font-medium">
											{'Наличие: '}
											<Input
												type="checkbox"
												className="w-5 h-5"
												onChange={field.onChange}
												checked={field.value}
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="categoryId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Категория</FormLabel>
									<FormControl>
										<GroupSelect renderCreateLable={e => e.split('&')[0]} {...catOptions} field={field} />
									</FormControl>
									<FormDescription>
										Выберите или создайте категорию. при создании категории - название & описание
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="facturerId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Производитель</FormLabel>
									<FormControl>
										<GroupSelect {...facOptions} field={field} />
									</FormControl>
									<FormDescription>Выберите или создайте производителя.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="images"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Изображения</FormLabel>
								<FormControl>
									<ImageSelector value={field.value || []} onChange={field.onChange} />
								</FormControl>
								<FormDescription>Выберите изображения.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Название</FormLabel>
							<FormControl>
								<Input placeholder="Название" onChange={field.onChange} value={field.value} />
							</FormControl>
							<FormDescription>Введите название.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="meta"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Мета информация</FormLabel>
							<FormControl>
								<Textarea placeholder="Мета" onChange={field.onChange} value={field.value} />
							</FormControl>
							<FormDescription>Ключевые слова, нужные при поиске (через запятую)</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="desc"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Краткое описание товара</FormLabel>
							<FormControl>
								<AppEditor
									key={field.value?.slice(0, 10)}
									initialValue={field.value && JSON.parse(field.value)}
									onChange={e => field.onChange(JSON.stringify(e))}
								/>
							</FormControl>
							<FormDescription>Введите дополнительный текст.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="body"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Полноценное описание товара</FormLabel>
							<FormControl>
								<AppEditor
									key={field.value?.slice(0, 10)}
									initialValue={field.value && JSON.parse(field.value)}
									onChange={e => field.onChange(JSON.stringify(e))}
								/>
							</FormControl>
							<FormDescription>Введите текст.</FormDescription>
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

export default UpdateProductForm
