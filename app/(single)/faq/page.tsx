'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@front/shared/ui/card'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@front/shared/ui/accordion'
import { Input } from '@front/shared/ui/input'
import { Button } from '@front/shared/ui/button'
import { Search } from 'lucide-react'

const faqs = [
	{
		question: 'Какие виды автопилотов вы предлагаете?',
		answer:
			"Мы предлагаем широкий спектр автопилотов, включая модели для малых судов, яхт и коммерческих кораблей. Наши популярные модели включают 'АвтоПилот Про' и 'АвтоШтурвал Комфорт', которые подходят для различных типов судов и условий навигации."
	},
	{
		question: 'Как выбрать подходящее подруливающее устройство?',
		answer:
			'Выбор подруливающего устройства зависит от размера и типа вашего судна, а также условий его эксплуатации. Мы рекомендуем учитывать длину судна, его водоизмещение и мощность основного двигателя. Наши специалисты готовы помочь вам подобрать оптимальное решение, исходя из ваших конкретных потребностей.'
	},
	{
		question: 'Предоставляете ли вы гарантию на оборудование?',
		answer:
			'Да, мы предоставляем гарантию на все наше оборудование. Стандартная гарантия составляет 2 года с момента покупки. Для некоторых продуктов доступна расширенная гарантия. Подробные условия гарантии предоставляются при покупке оборудования.'
	},
	{
		question: 'Как осуществляется доставка оборудования?',
		answer:
			'Мы осуществляем доставку по всей России. Для небольших заказов используем курьерские службы и почту России. Для крупногабаритного оборудования организуем транспортировку с помощью транспортных компаний. Сроки и стоимость доставки зависят от вашего местоположения и выбранного способа доставки.'
	},
	{
		question: 'Проводите ли вы обучение по использованию оборудования?',
		answer:
			'Да, мы проводим обучение по использованию нашего оборудования. Это включает в себя базовые инструкции по установке, настройке и эксплуатации. Для сложных систем, таких как интегрированные навигационные комплексы, мы предлагаем расширенные курсы обучения. Обучение может проводиться как на вашем судне, так и в нашем учебном центре.'
	},
	{
		question: 'Какие виды оплаты вы принимаете?',
		answer:
			'Мы принимаем различные виды оплаты, включая банковские переводы, оплату картой (Visa, MasterCard, МИР) и электронные платежи. Для юридических лиц доступна оплата по счету. При крупных заказах возможна рассрочка платежа, условия которой обсуждаются индивидуально.'
	},
	{
		question: 'Предоставляете ли вы услуги по установке оборудования?',
		answer:
			'Да, мы предоставляем услуги по установке оборудования. Наши сертифицированные специалисты могут выполнить профессиональную установку на вашем судне. Это гарантирует правильную работу оборудования и сохранение гарантии. Стоимость установки зависит от типа оборудования и сложности работ.'
	},
	{
		question: 'Как часто нужно обслуживать навигационное оборудование?',
		answer:
			'Рекомендуемая частота обслуживания зависит от типа оборудования и интенсивности его использования. В среднем, мы рекомендуем проводить техническое обслуживание раз в год или каждые 1000 часов работы. Некоторые устройства, такие как GPS-приемники, требуют менее частого обслуживания, в то время как механические системы, например, подруливающие устройства, могут нуждаться в более частых проверках.'
	}
]
const FaqPage = () => {
	const [searchTerm, setSearchTerm] = useState('')

	const filteredFaqs = faqs.filter(
		faq =>
			faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
			faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
	)
	return (
		<main className="container mx-auto w-[90%] px-4 py-20">
			<h2 className="text-3xl font-bold mb-12 text-center">
				Ответы на часто задаваемые вопросы
			</h2>

			<Card className="mb-8">
				<CardHeader>
					<CardTitle className="text-2xl">Поиск по вопросам</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex items-center space-x-2">
						<div className="relative flex-grow">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Введите ваш вопрос..."
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
								className="pl-10"
							/>
						</div>
						<Button variant="secondary" onClick={() => setSearchTerm('')}>
							Очистить
						</Button>
					</div>
				</CardContent>
			</Card>

			<Accordion type="single" collapsible className="w-full">
				{filteredFaqs.map((faq, index) => (
					<AccordionItem key={index} value={`item-${index}`}>
						<AccordionTrigger>{faq.question}</AccordionTrigger>
						<AccordionContent>{faq.answer}</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>

			{filteredFaqs.length === 0 && (
				<p className="text-center text-muted-foreground mt-8">
					По вашему запросу ничего не найдено. Попробуйте изменить поисковый запрос.
				</p>
			)}
		</main>
	)
}

export default FaqPage
