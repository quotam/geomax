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
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { SendModalAction } from './action'
import { FeedbackDto, FeedbackSchema } from './dto'

export default function Modal({ trigger }: { trigger?: ReactNode }) {
	const searchParams = useSearchParams()
	const modal = searchParams.get('modal')
	const router = useRouter()
	const [open, setOpen] = useState(false)

	const form = useForm<FeedbackDto>({
		resolver: zodResolver(FeedbackSchema),
		defaultValues: {
			name: '',
			phone: '',
			agreed: false
		}
	})

	const { mutate, isPending } = useMutation({
		mutationFn: async (dto: FeedbackDto) => SendModalAction(dto),
		onSuccess: () => {
			setOpen(false)
		},
		onError: () => toast.error('Произошла ошибка')
	})

	function onSubmit(values: z.infer<typeof FeedbackSchema>) {
		mutate(values)
	}

	useEffect(() => {
		const isOpen = typeof modal === 'string' ? true : false
		setOpen(isOpen)
		form.reset()
	}, [modal])

	return (
		<SuperModal
			open={open}
			style={{
				dialog: 'max-w-100'
			}}
			setOpen={val => {
				if (!val) {
					const url = new URL(window.location.href)
					url.searchParams.delete('modal')
					router.push(url.toString())
				} else setOpen(val)
			}}
			trigger={trigger}
			title={
				<div className="flex items-center gap-3">
					<LogoIcon className="text-primary mx-auto w-15 h-15" />
					<span className="font-bold text-left">Заявка на консультацию и подбор оборудования</span>
				</div>
			}
			content={
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Как к Вам обращаться?</FormLabel>
									<FormControl>
										<Input {...field} />
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
										<Input {...field} type="tel" />
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
							Отправить заявку
						</Button>
					</form>
				</Form>
			}
		/>
	)
}
