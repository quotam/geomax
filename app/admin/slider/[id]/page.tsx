'use client'

import AppEditor from '@front/entities/editor'
import { Button } from '@front/shared/ui/button'
import { Card, CardContent } from '@front/shared/ui/card'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Save, Upload } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
	title: z.string().min(1, { message: 'Заголовок обязателен' }),
	description: z.string(),
	imageUrl: z.string().url({ message: 'Введите корректный URL изображения' })
})

export default function SlideEditor({
	params
}: {
	params: { slideId: number }
}) {
	const router = useRouter()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			description: '',
			imageUrl: ''
		}
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values)
		router.push('/admin/slides')
	}

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				form.setValue('imageUrl', reader.result as string)
			}
			reader.readAsDataURL(file)
		}
	}

	return (
		<div className="container mx-auto p-4">
			<Button
				variant="ghost"
				onClick={() => router.push('/admin/slider')}
				className="mb-4"
			>
				<ArrowLeft className="mr-2 h-4 w-4" /> Назад к списку слайдов
			</Button>

			<h1 className="text-2xl font-bold mb-4">Редактирование слайда</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Card>
					<CardContent>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
								<FormField
									control={form.control}
									name="title"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Заголовок</FormLabel>
											<FormControl>
												<Input placeholder="Введите заголовок слайда" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									name="description"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Описание</FormLabel>
											<FormControl>
												<AppEditor />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="imageUrl"
									render={({ field }) => (
										<FormItem>
											<FormLabel>URL изображения</FormLabel>
											<FormControl>
												<div className="flex gap-2">
													<Input placeholder="URL изображения" {...field} />
													<Button
														type="button"
														variant="outline"
														onClick={() => document.getElementById('imageUpload')?.click()}
													>
														<Upload className="mr-2 h-4 w-4" /> Загрузить
													</Button>
													<input
														id="imageUpload"
														type="file"
														accept="image/*"
														className="hidden"
														onChange={handleImageUpload}
													/>
												</div>
											</FormControl>
											<FormDescription>
												Введите URL изображения или загрузите новое
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit" className="w-full">
									<Save className="mr-2 h-4 w-4" /> Сохранить изменения
								</Button>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
