import React from 'react'
import { Button } from '@front/shared/ui/button'
import { Input } from '@front/shared/ui/input'
import { Textarea } from '@front/shared/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@front/shared/ui/card'
import { Mail, MapPin, Phone } from 'lucide-react'

const ContactPage = () => {
	return (
		<main className="flex-grow container px-4 py-20">
			<h2 className="text-3xl text-center font-bold mb-12">Контакты</h2>

			<div className="grid sm:grid-cols-1 w-[90%] mx-auto grid-cols-2 gap-8">
				<Card>
					<CardHeader>
						<CardTitle>Send us a message</CardTitle>
					</CardHeader>
					<CardContent>
						<form className="space-y-4">
							<div>
								<label htmlFor="name" className="block text-sm font-medium mb-1">
									Name
								</label>
								<Input id="name" placeholder="Your name" />
							</div>
							<div>
								<label htmlFor="email" className="block text-sm font-medium mb-1">
									Email
								</label>
								<Input id="email" type="email" placeholder="your@email.com" />
							</div>
							<div>
								<label htmlFor="message" className="block text-sm font-medium mb-1">
									Message
								</label>
								<Textarea id="message" placeholder="Your message" rows={4} />
							</div>
							<Button type="submit" className="w-full">
								Send Message
							</Button>
						</form>

						<div className="mt-20 w-2/3 space-y-4">
							<span>
								Если вам нужна консультация по интересующему вас вопросу, обратитесь к
								нашим специалистам.
							</span>
							<Button variant="secondary">Заявка на консультацию</Button>
						</div>
					</CardContent>
				</Card>

				<div className="space-y-8">
					<Card>
						<CardHeader>
							<CardTitle>Contact Information</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center space-x-2">
								<MapPin className="text-muted-foreground" />
								<span>123 Business Road, City, Country</span>
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
							<CardTitle>Our Location</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="bg-muted aspect-video flex items-center justify-center">
								<span className="text-muted-foreground">Map Placeholder</span>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	)
}

export default ContactPage
