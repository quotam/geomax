'use client'

import Link from 'next/link'

import { Button } from '@front/shared/ui/button'
import { Checkbox } from '@front/shared/ui/checkbox'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@front/shared/ui/form'
import { Input } from '@front/shared/ui/input'
import { Textarea } from '@front/shared/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { SendModalAction } from './action'
import { FeedbackDto, FeedbackSchema } from './dto'

export default function FeedbackForm() {
	const form = useForm<FeedbackDto>({
		resolver: zodResolver(FeedbackSchema),
		defaultValues: {
			name: '',
			email: '',
			agreed: false
		}
	})

	const { mutate, isPending } = useMutation({
		mutationFn: async (dto: FeedbackDto) => SendModalAction(dto),
		onSuccess: () => toast.success('Сообщение отправлено'),
		onError: () => toast.error('Произошла ошибка')
	})

	function onSubmit(values: z.infer<typeof FeedbackSchema>) {
		mutate(values)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Как к Вам обращаться?</FormLabel>
							<FormControl>
								<Input placeholder="Имя" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Ваш email для связи</FormLabel>
							<FormControl>
								<Input placeholder="Email" {...field} type="email" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="message"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Ваш email для связи</FormLabel>
							<FormControl>
								<Textarea {...field} rows={4} placeholder="Сообщение" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="agreed"
					render={({ field }) => (
						<FormItem className="flex flex-row items-start space-x-3 space-y-0">
							<FormControl>
								<Checkbox checked={field.value} onCheckedChange={field.onChange} />
							</FormControl>
							<div className="space-y-1 leading-none">
								<FormLabel className="text-xs text-muted-foreground">
									<span>
										Я прочитал, ознакомился и согласен с условиями{' '}
										<Link href="/privacy" className="inline">
											Политики конфиденциальности
										</Link>{' '}
									</span>
								</FormLabel>
								<FormMessage />
							</div>
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={isPending} className="w-full">
					Отправить сообщение
				</Button>
			</form>
		</Form>
	)
}
