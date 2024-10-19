'use client'
import { Button } from '@front/shared/ui/button'
import { Checkbox } from '@front/shared/ui/checkbox'
import { Input } from '@front/shared/ui/input'
import { Label } from '@front/shared/ui/label'
import LogoIcon from '@front/shared/ui/logoIcon'
import { SuperModal } from '@front/shared/ui/superModal'
import { useRouter, useSearchParams } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'

export default function Modal({ trigger }: { trigger?: ReactNode }) {
	const searchParams = useSearchParams()
	const modal = searchParams.get('modal')
	const router = useRouter()
	const [open, setOpen] = useState(false)
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [agreed, setAgreed] = useState(false)

	useEffect(() => {
		const isOpen = typeof modal === 'string' ? true : false
		setOpen(isOpen)
	}, [modal])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		// Handle form submission logic here
		console.log('Form submitted:', { name, phone, agreed })
		setOpen(false)
	}

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
					<span className="font-bold text-left">
						Заявка на консультацию и подбор оборудования
					</span>
				</div>
			}
			content={
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="space-y-2">
						<Label htmlFor="name">Как к Вам обращаться?</Label>
						<Input
							id="name"
							value={name}
							onChange={e => setName(e.target.value)}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="phone">Ваш номер телефона для связи</Label>
						<Input
							id="phone"
							type="tel"
							value={phone}
							onChange={e => setPhone(e.target.value)}
							required
						/>
					</div>
					<div className="flex items-center space-x-4">
						<Checkbox
							id="terms"
							checked={agreed}
							onCheckedChange={checked => setAgreed(checked as boolean)}
							required
						/>
						<Label htmlFor="terms" className="text-xs text-muted-foreground">
							Я прочитал, ознакомился и согласен с условиями Политики
							конфиденциальности
						</Label>
					</div>
					<Button type="submit" className="w-full">
						Отправить заявку
					</Button>
				</form>
			}
		/>
	)
}
