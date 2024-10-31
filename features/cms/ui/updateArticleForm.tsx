'use client'

import { ArticleUpdateDto, ArticleUpdateSchema } from '@front/entities/article/_domain/dto'
import { articleQueries } from '@front/entities/article/_queries'
import AppEditor from '@front/entities/editor'
import { onUpload, validateFn } from '@front/entities/editor/vm/uploadImage'
import { selectFile } from '@front/shared/lib/file'
import { cn } from '@front/shared/lib/utils'
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
import { ArticleStatus, ArticleType } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { Image } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'

import { useArticleCat } from '../vm/useArticleCat'
import GroupSelect from './groupSelect'

const UpdateArticleForm = ({
	data,
	isPending,
	entityType
}: {
	data?: ArticleUpdateDto | null
	entityType: ArticleType
	isPending: boolean
}) => {
	const form = useForm<ArticleUpdateDto>({
		resolver: zodResolver(ArticleUpdateSchema)
	})

	const options = useArticleCat(entityType)

	const { mutateAsync, isPending: isPendingUpdate } = useMutation(
		articleQueries(entityType).update()
	)

	React.useEffect(() => {
		if (data) form.reset(data)
	}, [data, form])

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(values => mutateAsync(values))}
				className={`space-y-4 border bg-card mx-auto p-6 bg-white rounded-lg shadow-md ${isPending && 'animate-pulse bg-secondary/5'}`}
			>
				<h1 className="text-2xl font-bold mb-10">Редактирование {entityType.toLowerCase()}</h1>
				<div className="grid grid-cols-2 gap-4">
					<div
						className={cn(
							'space-y-4',
							entityType === ArticleType.FAQ && 'col-span-2 grid grid-cols-2 gap-4 space-y-0'
						)}
					>
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
											{Object.values(ArticleStatus).map(status => (
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
							name="categoryId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Категория</FormLabel>
									<FormControl>
										<GroupSelect {...options} field={field} />
									</FormControl>
									<FormDescription>Выберите категорию.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					{entityType !== ArticleType.FAQ && (
						<FormField
							control={form.control}
							name="image"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Изображение</FormLabel>
									<FormControl>
										<Button
											variant="secondary"
											className="w-full flex-col h-auto"
											onClick={e => {
												e.preventDefault()
												selectFile('image/*').then(file => {
													if (validateFn(file)) onUpload(file).then(url => field.onChange(url))
												})
											}}
										>
											<div className="flex items-center gap-2">
												Выберите изображение <Image size={20} />
											</div>
											{field.value && <img src={field.value} alt="preview" className="w-full object-cover" />}
										</Button>
									</FormControl>
									<FormDescription>
										Выберите изображение.{' '}
										{field.value && (
											<Button
												variant="link"
												className="text-destructive"
												onClick={e => {
													e.preventDefault()
													field.onChange('')
												}}
											>
												Сбросить
											</Button>
										)}
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
				</div>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Название</FormLabel>
							<FormControl>
								<Input onChange={field.onChange} defaultValue={field.value} />
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
								<Textarea onChange={field.onChange} defaultValue={field.value} />
							</FormControl>
							<FormDescription>Ключевые слова, нужные при поиске (через запятую)</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{entityType !== ArticleType.FAQ && (
					<FormField
						control={form.control}
						name="body"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Контент</FormLabel>
								<FormControl>
									<AppEditor
										key={field.value?.slice(0, 10)}
										initialValue={field.value && JSON.parse(field.value)}
										onChange={e => field.onChange(JSON.stringify(e))}
									/>
								</FormControl>
								<FormDescription>Основное содержимое.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				<FormField
					control={form.control}
					name="desc"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Описание</FormLabel>
							<FormControl>
								<AppEditor
									key={field.value?.slice(0, 10)}
									initialValue={field.value && JSON.parse(field.value)}
									onChange={e => field.onChange(JSON.stringify(e))}
								/>
							</FormControl>
							<FormDescription>
								Превью {entityType.toLowerCase()}, краткая информация. (в редких случаях не требуется).
							</FormDescription>
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

export default UpdateArticleForm
