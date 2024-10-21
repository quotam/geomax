import { Card, CardContent, CardHeader, CardTitle } from '@front/shared/ui/card'
import { Building2, FileText, Globe, Mail, MapPin, Phone } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Реквизиты',
	description: 'Реквизиты'
}

const LegalPage = () => {
	return (
		<main className="container px-4 py-20">
			<h1 className="text-3xl font-bold mb-12 text-center">
				Реквизиты ООО ГЕОМАКС
			</h1>
			<div className="w-[90%] mx-auto">
				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl">ООО &quot; МорТех &quot; </CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4">
							<div className="flex items-center space-x-2">
								<Building2 className="h-5 w-5 text-muted-foreground" />
								<span>
									Полное наименование: Общество с ограниченной ответственностью Морские
									Технологии
								</span>
							</div>
							<div className="flex items-center space-x-2">
								<MapPin className="h-5 w-5 text-muted-foreground" />
								<span>
									Юридический адрес: 199406, г. Санкт-Петербург, ул. Морская, д. 15, офис
									301
								</span>
							</div>
							<div className="flex items-center space-x-2">
								<Phone className="h-5 w-5 text-muted-foreground" />
								<span>Телефон: +7 (812) 123-45-67</span>
							</div>
							<div className="flex items-center space-x-2">
								<Mail className="h-5 w-5 text-muted-foreground" />
								<span>Email: info@mortech.ru</span>
							</div>
							<div className="flex items-center space-x-2">
								<Globe className="h-5 w-5 text-muted-foreground" />
								<span>Сайт: www.mortech.ru</span>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl">Регистрационные данные</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4">
							<div className="flex items-center space-x-2">
								<FileText className="h-5 w-5 text-muted-foreground" />
								<span>ИНН: 7801234567</span>
							</div>
							<div className="flex items-center space-x-2">
								<FileText className="h-5 w-5 text-muted-foreground" />
								<span>КПП: 780101001</span>
							</div>
							<div className="flex items-center space-x-2">
								<FileText className="h-5 w-5 text-muted-foreground" />
								<span>ОГРН: 1157847123456</span>
							</div>
							<div className="flex items-center space-x-2">
								<FileText className="h-5 w-5 text-muted-foreground" />
								<span>ОКПО: 12345678</span>
							</div>
							<div className="flex items-center space-x-2">
								<FileText className="h-5 w-5 text-muted-foreground" />
								<span>
									ОКВЭД: 46.69.9 (Торговля оптовая прочими машинами, приборами,
									аппаратурой и оборудованием общепромышленного и специального
									назначения)
								</span>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-2xl">Банковские реквизиты</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4">
							<div>
								<span className="font-bold">Расчетный счет:</span> 40702810123450000001
							</div>
							<div>
								<span className="font-bold">Банк:</span> ПАО Сбербанк
							</div>
							<div>
								<span className="font-bold">БИК:</span> 044030653
							</div>
							<div>
								<span className="font-bold">Корр. счет:</span> 30101810500000000653
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</main>
	)
}

export default LegalPage
