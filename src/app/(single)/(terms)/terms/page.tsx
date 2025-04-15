import type { Metadata } from 'next'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@front/shared/ui/accordion'
import { Card, CardContent, CardHeader, CardTitle } from '@front/shared/ui/card'
import { ChevronRight, Cookie, FileText, Shield } from 'lucide-react'

export const metadata: Metadata = {
	title: 'Пользовательское соглашение',
	description: 'Пользовательское соглашение сайта'
}

export default function UserAgreementPage() {
	const siteName = 'agro-nav.ru'

	return (
		<main className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
			<div className="container mx-auto px-4 py-12 max-w-[90rem] sm:px-0">
				<Card className="mb-8 sm:mx-2">
					<CardHeader className="text-center">
						<CardTitle className="text-4xl font-bold">Пользовательское соглашение</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-muted-foreground text-center">
							Пожалуйста, внимательно ознакомьтесь с условиями использования сайта {siteName}
						</p>
					</CardContent>
				</Card>

				<div className="p-6 space-y-8">
					<AgreementSection
						icon={<FileText className="w-6 h-6" />}
						title="1. Общие положения"
						content={`Настоящее Пользовательское соглашение (далее — «Соглашение») регламентирует отношения между ${siteName} (далее — «Сайт») и пользователем сети Интернет (далее — «Пользователь») по использованию Сайта.`}
					/>

					<AgreementSection
						icon={<Shield className="w-6 h-6" />}
						title="2. Предмет соглашения"
						content="Сайт предоставляет Пользователю доступ к содержащейся на Сайте информации и сервисам на условиях, предусмотренных настоящим Соглашением."
					/>

					<AgreementSection
						icon={<Cookie className="w-6 h-6" />}
						title="3. Использование файлов cookie"
						content={
							<>
								<p>
									Сайт использует файлы cookie для улучшения пользовательского опыта и функциональности
									Сайта. Продолжая использовать Сайт, Пользователь соглашается на использование файлов cookie
									в соответствии с настоящим Соглашением.
								</p>
								<Accordion type="single" collapsible className="mt-4">
									<AccordionItem value="cookie-details">
										<AccordionTrigger>Подробнее о файлах cookie</AccordionTrigger>
										<AccordionContent>
											<ul className="list-disc pl-5 space-y-2">
												<li>
													Файлы cookie — это небольшие текстовые файлы, которые сохраняются на устройстве
													Пользователя.
												</li>
												<li>
													Мы используем файлы cookie для анализа трафика, персонализации контента и улучшения
													работы Сайта.
												</li>
												<li>
													Пользователь может отключить использование файлов cookie в настройках своего браузера,
													однако это может повлиять на функциональность Сайта.
												</li>
											</ul>
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</>
						}
					/>

					<AgreementSection
						icon={<ChevronRight className="w-6 h-6" />}
						title="4. Права и обязанности сторон"
						content="Пользователь обязуется использовать Сайт в соответствии с действующим законодательством и настоящим Соглашением. Сайт оставляет за собой право изменять содержание и функциональность Сайта без предварительного уведомления Пользователя."
					/>

					<AgreementSection
						icon={<ChevronRight className="w-6 h-6" />}
						title="5. Ограничение ответственности"
						content="Сайт не несет ответственности за любые прямые или косвенные убытки, произошедшие из-за использования или невозможности использования Сайта."
					/>

					<AgreementSection
						icon={<ChevronRight className="w-6 h-6" />}
						title="6. Изменение условий соглашения"
						content="Сайт оставляет за собой право изменять условия настоящего Соглашения. Пользователь обязуется регулярно проверять условия настоящего Соглашения на предмет их изменения."
					/>

					<AgreementSection
						icon={<ChevronRight className="w-6 h-6" />}
						title="7. Обработка персональных данных"
						content="Сайт не осуществляет регистрацию пользователей и не собирает персональные данные, за исключением информации, автоматически передаваемой в процессе использования Сайта, в том числе IP-адрес, информация из cookie, информация о браузере пользователя."
					/>

					<AgreementSection
						icon={<ChevronRight className="w-6 h-6" />}
						title="8. Заключительные положения"
						content="Настоящее Соглашение регулируется и толкуется в соответствии с законодательством Российской Федерации. Вопросы, не урегулированные настоящим Соглашением, подлежат разрешению в соответствии с законодательством Российской Федерации."
					/>
				</div>
			</div>
		</main>
	)
}

function AgreementSection({
	icon,
	title,
	content
}: {
	icon: React.ReactNode
	title: string
	content: React.ReactNode
}) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center space-x-2 text-xl font-semibold">
					{icon}
					<span>{title}</span>
				</CardTitle>
			</CardHeader>
			<CardContent>{content}</CardContent>
		</Card>
	)
}
