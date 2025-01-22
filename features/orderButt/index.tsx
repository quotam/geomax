'use client'

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
import LogoIcon from '@front/shared/ui/logoIcon'
import { SuperModal } from '@front/shared/ui/superModal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { SendModalAction } from './action'
import { FeedbackDto, FeedbackSchema } from './dto'

export default function OrderButt({ product }: { product: string }) {
	const [open, setOpen] = useState(false)

	const form = useForm<FeedbackDto>({
		resolver: zodResolver(FeedbackSchema),
		defaultValues: {
			name: '',
			phone: '',
			email: '',
			product: product,
			agreed: false
		}
	})

	const { mutate, isPending } = useMutation({
		mutationFn: async (dto: FeedbackDto) => SendModalAction(dto),
		onSuccess: () => {
			toast.success('Заявка сформирована.')
			setOpen(false)
		},
		onError: () => toast.error('Произошла ошибка')
	})

	function onSubmit(values: z.infer<typeof FeedbackSchema>) {
		mutate(values)
	}

	return (
		<>
			<Button onClick={() => setOpen(true)}>
				Заказать <ShoppingCart className="ml-2 h-4 w-4" />
			</Button>
			<SuperModal
				open={open}
				style={{
					dialog: 'max-w-[50rem]'
				}}
				setOpen={setOpen}
				title={
					<div className="flex items-center justify-center gap-2">
						<LogoIcon className="text-primary w-15 h-15" />
						<span className="font-bold text-left">Заказать оборудование</span>
					</div>
				}
				content={
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Как к Вам обращаться?</FormLabel>
										<FormControl>
											<Input placeholder="Ваше имя" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="phone"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Ваш номер телефона для связи</FormLabel>
										<FormControl>
											<Input {...field} type="tel" placeholder="Ваш номер телефона" />
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
										<FormLabel>Ваш email телефона для связи</FormLabel>
										<FormControl>
											<Input
												placeholder="Ваш email*"
												onChange={field.onChange}
												value={field.value || ''}
												type="tel"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="product"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Наименование оборудования</FormLabel>
										<FormControl>
											<Input disabled {...field} />
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
												Я прочитал, ознакомился и согласен с условиями{' '}
												<Link href="/privacy">Политики конфиденциальности</Link>
											</FormLabel>
											<FormMessage />
										</div>
									</FormItem>
								)}
							/>
							<Button type="submit" disabled={isPending} className="w-full">
								Отправить
							</Button>
						</form>
					</Form>
				}
			/>
		</>
	)
}
