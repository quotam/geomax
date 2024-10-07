'use client'

import {
	ArticleUpdateDto,
	ArticleUpdateSchema
} from '@front/entities/article/_domain/dto'
import { articleQueries } from '@front/entities/article/_queries'
import AppEditor from '@front/entities/editor'
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
import { useForm } from 'react-hook-form'

const UpdateArticleForm = ({
	data,
	entityType
}: {
	data: ArticleUpdateDto
	entityType: ArticleType
}) => {
	const form = useForm<ArticleUpdateDto>({
		resolver: zodResolver(ArticleUpdateSchema),
		defaultValues: {
			id: data.id,
			status: data.status,
			body: data.body,
			desc: data.desc,
			meta: data.meta,
			categoryId: data.categoryId
		}
	})

	const { mutateAsync, isPending: isPendingUpdate } = useMutation(
		articleQueries(entityType).update()
	)

	function onSubmit(values: ArticleUpdateDto) {
		mutateAsync(values)
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4 border mx-auto p-6 bg-white rounded-lg shadow-md"
			>
				<h1 className="text-2xl font-bold mb-10">
					Редактирование {entityType.toLowerCase()}
				</h1>
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
							<FormDescription>
								Ключевые слова, нужные при поиске (через запятую)
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{entityType !== ArticleType.FAQ && (
					<FormField
						control={form.control}
						name="desc"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Описание</FormLabel>
								<FormControl>
									<AppEditor
										initialValue={data?.body ? JSON.parse(data.body) : undefined}
										onChange={e => field.onChange(JSON.stringify(e))}
									/>
								</FormControl>
								<FormDescription>
									Превью {entityType.toLowerCase()}, краткая информация. (в редких
									случаях не требуется).
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				<FormField
					control={form.control}
					name="body"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Контент</FormLabel>
							<FormControl>
								<AppEditor
									initialValue={data?.body ? JSON.parse(data.body) : undefined}
									onChange={e => field.onChange(JSON.stringify(e))}
								/>
							</FormControl>
							<FormDescription>Основное содержимое.</FormDescription>
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

export default UpdateArticleForm
