'use client'
import { Button } from '@front/shared/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@front/shared/ui/card'
import { Input } from '@front/shared/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@front/shared/ui/select'
import { Textarea } from '@front/shared/ui/textarea'
import { BarChart, Plus, Users } from 'lucide-react'
import {
	Bar,
	Cell,
	Pie,
	PieChart,
	BarChart as RechartsBarChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts'

export default function AdminPanel() {
	const navItems = [
		{ name: 'Dashboard', icon: BarChart },
		{ name: 'Слайдер', icon: Users },
		{ name: 'Новости', icon: Users },
		{ name: 'Продукты', icon: Users },
		{ name: 'FAQ', icon: Users },
		{ name: 'Выполненные проекты', icon: Users },
		{ name: 'Сезонные предложения', icon: Users },
		{ name: 'Товары', icon: Users }
	]

	const visitorData = [
		{ name: 'Пн', visitors: 400 },
		{ name: 'Вт', visitors: 300 },
		{ name: 'Ср', visitors: 500 },
		{ name: 'Чт', visitors: 280 },
		{ name: 'Пт', visitors: 590 },
		{ name: 'Сб', visitors: 320 },
		{ name: 'Вс', visitors: 280 }
	]

	const deviceData = [
		{ name: 'Смартфон', value: 65 },
		{ name: 'Десктоп', value: 25 },
		{ name: 'Планшет', value: 10 }
	]

	const locationData = [
		{ name: 'Москва', value: 40 },
		{ name: 'Санкт-Петербург', value: 30 },
		{ name: 'Новосибирск', value: 15 },
		{ name: 'Екатеринбург', value: 10 },
		{ name: 'Другие', value: 5 }
	]

	const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

	return (
		<div className="min-h-screen">
			<div className="container p-6 my-8">
				<div className="flex">
					<aside className="w-64 mr-8">
						<nav className="space-y-1">
							{navItems.map(item => (
								<a
									key={item.name}
									href="#"
									className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
								>
									<item.icon className="mr-3 h-6 w-6" />
									{item.name}
								</a>
							))}
						</nav>
					</aside>

					<main className="flex-1">
						<h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

						<div className="grid sm:grid-cols-1 gap-4 md:grid-cols-2 grid-cols-3 mb-8">
							<Card>
								<CardHeader>
									<CardTitle>Посетители за неделю</CardTitle>
								</CardHeader>
								<CardContent className="pb-4">
									<div className="h-[200px]">
										<ResponsiveContainer width="100%" height="100%">
											<RechartsBarChart data={visitorData}>
												<XAxis dataKey="name" />
												<YAxis />
												<Tooltip />
												<Bar dataKey="visitors" fill="#8884d8" />
											</RechartsBarChart>
										</ResponsiveContainer>
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>Устройства</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="h-[200px]">
										<ResponsiveContainer width="100%" height="100%">
											<PieChart>
												<Pie
													data={deviceData}
													cx="50%"
													cy="50%"
													labelLine={false}
													outerRadius={80}
													fill="#8884d8"
													dataKey="value"
													label={({ name, percent }) =>
														`${name} ${(percent * 100).toFixed(0)}%`
													}
												>
													{deviceData.map((entry, index) => (
														<Cell
															key={`cell-${index}`}
															fill={COLORS[index % COLORS.length]}
														/>
													))}
												</Pie>
												<Tooltip />
											</PieChart>
										</ResponsiveContainer>
									</div>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>Местоположение</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="h-[200px]">
										<ResponsiveContainer width="100%" height="100%">
											<PieChart>
												<Pie
													data={locationData}
													cx="50%"
													cy="50%"
													labelLine={false}
													outerRadius={80}
													fill="#8884d8"
													dataKey="value"
													label={({ name, percent }) =>
														`${name} ${(percent * 100).toFixed(0)}%`
													}
												>
													{locationData.map((entry, index) => (
														<Cell
															key={`cell-${index}`}
															fill={COLORS[index % COLORS.length]}
														/>
													))}
												</Pie>
												<Tooltip />
											</PieChart>
										</ResponsiveContainer>
									</div>
								</CardContent>
							</Card>
						</div>

						<div className="grid sm:grid-cols-1 gap-4 grid-cols-2">
							<Card>
								<CardHeader>
									<CardTitle>Добавить новость</CardTitle>
									<CardDescription>
										Создайте новую новость для вашего сайта
									</CardDescription>
								</CardHeader>
								<CardContent>
									<form className="space-y-4">
										<Input placeholder="Заголовок новости" />
										<Textarea placeholder="Текст новости" />
										<Button>
											<Plus className="mr-2 h-4 w-4" /> Добавить новость
										</Button>
									</form>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Добавить FAQ</CardTitle>
									<CardDescription>Добавьте новый вопрос и ответ в FAQ</CardDescription>
								</CardHeader>
								<CardContent>
									<form className="space-y-4">
										<Input placeholder="Вопрос" />
										<Textarea placeholder="Ответ" />
										<Select>
											<SelectTrigger>
												<SelectValue placeholder="Выберите категорию" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="general">Общие вопросы</SelectItem>
												<SelectItem value="products">Продукты</SelectItem>
												<SelectItem value="shipping">Доставка</SelectItem>
											</SelectContent>
										</Select>
										<Button>
											<Plus className="mr-2 h-4 w-4" /> Добавить FAQ
										</Button>
									</form>
								</CardContent>
							</Card>
						</div>
					</main>
				</div>
			</div>
		</div>
	)
}
