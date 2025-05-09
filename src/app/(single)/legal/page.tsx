import { Metadata } from 'next'

import { Card, CardContent, CardHeader, CardTitle } from '@front/shared/ui/card'
import { Building2, FileText, Mail, MapPin, Phone } from 'lucide-react'

export const metadata: Metadata = {
	title: 'Реквизиты',
	description: 'Реквизиты ГЕОМАКС'
}

const LegalPage = () => {
	return (
		<main className="container px-4 py-20 sm:px-0">
			<h1 className="text-3xl sm:text-2xl font-bold mb-12 text-center">Реквизиты ГЕОМАКС</h1>
			<div className="w-[90%] mx-auto">
				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="text-2xl">Общая информация</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4">
							<div className="flex items-center space-x-2">
								<Building2 className="h-5 w-5 text-muted-foreground" />
								<span>Индивидуальный предприниматель Дурманов Максим Борисович</span>
							</div>
							<div className="flex items-center space-x-2">
								<MapPin className="h-5 w-5 text-muted-foreground" />
								<span>644109 г. Омск, ул. Моторная 11, кв. 3</span>
							</div>
							<div className="flex items-center space-x-2">
								<Phone className="h-5 w-5 text-muted-foreground" />
								<span>+7 903 981 18 62</span>
							</div>
							<div className="flex items-center space-x-2">
								<Mail className="h-5 w-5 text-muted-foreground" />
								<span>
									<a href="mailto:info@gpsagro.ru">Info@gpsagro.ru</a>
								</span>
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
								<span>ИНН: 550504149929</span>
							</div>
							<div className="flex items-center space-x-2">
								<FileText className="h-5 w-5 text-muted-foreground" />
								<span>ОГРНИП: 321554300044684</span>
							</div>
							<div className="flex items-center space-x-2">
								<FileText className="h-5 w-5 text-muted-foreground" />
								<span>Руководитель: Дурманов Максим Борисович</span>
							</div>
							<div className="flex items-center space-x-2">
								<FileText className="h-5 w-5 text-muted-foreground" />
								<span>Главный бухгалтер: Дурманов Максим Борисович</span>
							</div>
							<div className="flex items-center space-x-2">
								<FileText className="h-5 w-5 text-muted-foreground" />
								<span>
									Лицо, уполномоченное подписывать договоры по доверенности: Дурманов Максим Борисович
								</span>
							</div>
							<div className="flex items-center space-x-2">
								<FileText className="h-5 w-5 text-muted-foreground" />
								<span>ОКВЭД: 63.11</span>
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
								<span className="font-bold">Расчетный счет:</span> 40802810523050013262{' '}
							</div>
							<div>
								<span className="font-bold">Банк:</span> ФИЛИАЛ &quot;НОВОСИБИРСКИЙ&quot; АО
								&quot;ЛЬФА-БАНК&quot;
							</div>
							<div>
								<span className="font-bold">БИК: </span>045004774
							</div>
							<div>
								<span className="font-bold">Корр. счет:</span> 30101810600000000774
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</main>
	)
}

export default LegalPage
