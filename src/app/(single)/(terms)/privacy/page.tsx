import type { Metadata } from 'next'
import Link from 'next/link'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@front/shared/ui/accordion'
import { Button } from '@front/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@front/shared/ui/card'
import { AlertTriangle, Cookie, Database, Eye, Globe, HelpCircle, Lock } from 'lucide-react'

export const metadata: Metadata = {
	title: 'Политика конфиденциальности',
	description: 'Политика конфиденциальности сайт'
}

export default function PrivacyPolicyPage() {
	const siteName = 'agro-nav.ru'

	return (
		<main className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
			<div className="container mx-auto px-4 py-12 max-w-[90rem] sm:px-0">
				<Card className="mb-8 sm:mx-2">
					<CardHeader className="text-center">
						<CardTitle className="text-4xl font-bold">Политика конфиденциальности</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-muted-foreground text-center">
							Мы ценим вашу конфиденциальность и стремимся защитить ваши данные <br /> при использовании
							сайта {siteName}
						</p>
					</CardContent>
				</Card>

				<div className="p-6 space-y-8">
					<PolicySection
						icon={<Eye className="w-6 h-6" />}
						title="1. Введение"
						content={`Настоящая Политика конфиденциальности объясняет, как ${siteName} (далее — «мы», «нас» или «наш») собирает, использует и защищает информацию, которую вы предоставляете при использовании нашего сайта.`}
					/>

					<PolicySection
						icon={<Database className="w-6 h-6" />}
						title="2. Сбор информации"
						content={
							<div>
								Мы не осуществляем регистрацию пользователей и не собираем персональные данные намеренно.
								Однако, мы автоматически собираем некоторую информацию при вашем посещении ${siteName},
								включая:
								<ul className="list-disc pl-5 mt-2 space-y-1">
									<li>IP-адрес</li>
									<li>Тип и версия браузера</li>
									<li>Тип устройства и операционная система</li>
									<li>Время и дата посещения</li>
									<li>Страницы, которые вы посещаете</li>
								</ul>{' '}
							</div>
						}
					/>

					<PolicySection
						icon={<Cookie className="w-6 h-6" />}
						title="3. Использование файлов cookie"
						content={
							<>
								<p>
									Наш сайт использует файлы cookie для улучшения пользовательского опыта и анализа
									использования сайта.
								</p>
								<Accordion type="single" collapsible className="mt-4">
									<AccordionItem value="cookie-details">
										<AccordionTrigger>Подробнее о файлах cookie</AccordionTrigger>
										<AccordionContent>
											<ul className="list-disc pl-5 space-y-2">
												<li>
													Файлы cookie — это небольшие текстовые файлы, которые сохраняются на вашем устройстве.
												</li>
												<li>Мы используем как сессионные, так и постоянные файлы cookie.</li>
												<li>
													Вы можете отключить файлы cookie в настройках вашего браузера, но это может повлиять на
													функциональность сайта.
												</li>
											</ul>
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</>
						}
					/>

					<PolicySection
						icon={<Lock className="w-6 h-6" />}
						title="4. Защита информации"
						content="Мы применяем соответствующие меры безопасности для защиты от несанкционированного доступа, изменения, раскрытия или уничтожения информации о наших пользователях."
					/>

					<PolicySection
						icon={<Globe className="w-6 h-6" />}
						title="5. Раскрытие информации третьим лицам"
						content="Мы не продаем, не обмениваем и не передаем вашу личную информацию третьим лицам. Это не включает доверенных третьих лиц, которые помогают нам в работе нашего сайта, при условии, что эти стороны соглашаются сохранять эту информацию в конфиденциальности."
					/>

					<PolicySection
						icon={<AlertTriangle className="w-6 h-6" />}
						title="6. Изменения в политике конфиденциальности"
						content="Мы можем обновлять нашу Политику конфиденциальности время от времени. Мы рекомендуем периодически проверять эту страницу на наличие изменений. Продолжая использовать наш сайт после внесения изменений, вы соглашаетесь с обновленной Политикой конфиденциальности."
					/>

					<PolicySection
						icon={<HelpCircle className="w-6 h-6" />}
						title="7. Контакты"
						content={
							<p>
								Если у вас есть какие-либо вопросы относительно нашей Политики конфиденциальности,
								пожалуйста, свяжитесь с нами, наши контакты доступны по{' '}
								<Button variant="link" className="p-0">
									<Link href="/contacts" legacyBehavior passHref>
										ссылке
									</Link>
								</Button>
								.
							</p>
						}
					/>
				</div>
			</div>
		</main>
	)
}

function PolicySection({
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
				<CardTitle className="flex items-center space-x-2 text-xl font-bold">
					{icon}
					<span>{title}</span>
				</CardTitle>
			</CardHeader>
			<CardContent>{content}</CardContent>
		</Card>
	)
}
