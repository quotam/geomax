'use client'

import AppEditor from '@front/entities/editor'
import { Button } from '@front/shared/ui/button'
import { Card, CardContent } from '@front/shared/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@front/shared/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
	content: z.string()
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
			content: ''
		}
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values)
		router.push('/admin/slides')
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

			<Card className="p-3">
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<FormField
								name="content"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Содержимое слайда</FormLabel>
										<FormControl>
											<AppEditor />
										</FormControl>
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
	)
}
