import FeedbackForm from '@front/features/feedback'
import { Button } from '@front/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@front/shared/ui/card'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
	title: 'Контакты',
	description: 'Контакты'
}

const ContactPage = () => {
	return (
		<main className="flex-grow container px-4 py-20">
			<h1 className="text-3xl text-center font-bold mb-12">Контакты</h1>

			<div className="grid sm:grid-cols-1 w-[90%] mx-auto grid-cols-2 gap-8">
				<Card>
					<CardHeader>
						<CardTitle>Отправьте нам сообщение</CardTitle>
					</CardHeader>
					<CardContent>
						<FeedbackForm />

						<div className="mt-20 w-2/3 space-y-4">
							<span>
								Если вам нужна консультация по интересующему вас вопросу, обратитесь к нашим специалистам.
							</span>
							<Button variant="secondary">
								<Link href="?modal">Заявка на консультацию</Link>
							</Button>
						</div>
					</CardContent>
				</Card>

				<div className="space-y-8">
					<Card>
						<CardHeader>
							<CardTitle>Контактная информация</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center space-x-2">
								<MapPin className="text-muted-foreground" />
								<span>123 Деловая улица, Город, Страна</span>
							</div>
							<div className="flex items-center space-x-2">
								<Phone className="text-muted-foreground" />
								<span>+1 (555) 123-4567</span>
							</div>
							<div className="flex items-center space-x-2">
								<Phone className="text-muted-foreground" />
								<span>+1 (555) 123-4567</span>
							</div>
							<div className="flex items-center space-x-2">
								<Mail className="text-muted-foreground" />
								<span>contact@acmecorp.com</span>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Наше местоположение</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="bg-muted aspect-video flex items-center justify-center">
								<span className="text-muted-foreground">Заглушка карты</span>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	)
}

export default ContactPage
