'use client'
import { useState } from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@front/shared/ui/card'
import { Input } from '@front/shared/ui/input'
import { Label } from '@front/shared/ui/label'
import { Button } from '@front/shared/ui/button'
import { Slider } from '@front/shared/ui/slider'
import { Calculator, Info } from 'lucide-react'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@front/shared/ui/tooltip'

const CalcPage = () => {
	const [fieldSize, setFieldSize] = useState(100)
	const [currentCoverage, setCurrentCoverage] = useState(80)
	const [newCoverage, setNewCoverage] = useState(95)
	const [costPerHectare, setCostPerHectare] = useState(5000)

	const calculateSavings = () => {
		const currentProcessedArea = fieldSize * (currentCoverage / 100)
		const newProcessedArea = fieldSize * (newCoverage / 100)
		const additionalProcessedArea = newProcessedArea - currentProcessedArea
		const savings = additionalProcessedArea * costPerHectare
		return savings.toFixed(2)
	}
	return (
		<main className="container mx-auto px-4 py-20">
			<h2 className="text-3xl font-bold mb-12 text-center">
				Калькулятор экономии{' '}
			</h2>

			<Card className="w-full max-w-[60rem] mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl">
						Расчет экономии при исключении пересева в 2 сошника{' '}
					</CardTitle>
					<CardDescription>
						Введите данные о вашем поле и затратах для расчета потенциальной экономии
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-8">
					<div className="space-y-2">
						<Label htmlFor="fieldSize">Размер поля (гектары)</Label>
						<Input
							id="fieldSize"
							type="number"
							value={fieldSize}
							onChange={e => setFieldSize(Number(e.target.value))}
							min={1}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="currentCoverage">Текущий охват обработки (%)</Label>
						<div className="flex items-center space-x-4">
							<Slider
								id="currentCoverage"
								min={0}
								max={100}
								step={1}
								value={[currentCoverage]}
								onValueChange={value => setCurrentCoverage(value[0])}
								className="flex-grow"
							/>
							<span className="w-12 text-right">{currentCoverage}%</span>
						</div>
					</div>
					<div className="space-y-2">
						<Label htmlFor="newCoverage">Новый охват обработки (%)</Label>
						<div className="flex items-center space-x-4">
							<Slider
								id="newCoverage"
								min={0}
								max={100}
								step={1}
								value={[newCoverage]}
								onValueChange={value => setNewCoverage(value[0])}
								className="flex-grow"
							/>
							<span className="w-12 text-right">{newCoverage}%</span>
						</div>
					</div>
					<div className="space-y-2">
						<div className="flex items-center space-x-2">
							<Label htmlFor="costPerHectare">Стоимость обработки за гектар (₽)</Label>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger>
										<Info className="h-4 w-4 text-muted-foreground" />
									</TooltipTrigger>
									<TooltipContent>
										<p>
											Введите среднюю стоимость обработки одного гектара, включая затраты
											на семена, удобрения, топливо и т.д.
										</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
						<Input
							id="costPerHectare"
							type="number"
							value={costPerHectare}
							onChange={e => setCostPerHectare(Number(e.target.value))}
							min={0}
						/>
					</div>
				</CardContent>
				<CardFooter className="flex flex-col items-center space-y-4">
					<Button className="w-full">
						<Calculator className="mr-2 h-4 w-4" /> Рассчитать экономию
					</Button>
					<div className="text-center">
						<p className="text-lg font-semibold">Потенциальная экономия:</p>
						<p className="text-3xl font-bold text-primary">{calculateSavings()} ₽</p>
					</div>
				</CardFooter>
			</Card>
		</main>
	)
}

export default CalcPage
