import { Metadata } from 'next'
import Link from 'next/link'

import SearchWidget from '@front/app/_widgets/searchWidget'
import { getQaListService } from '@front/entities/qa/server'
import { MdxCode } from '@front/shared/lib/mdx'
import { compileMDX } from '@front/shared/lib/mdx/server'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@front/shared/ui/accordion'
import { Button } from '@front/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@front/shared/ui/card'

export const metadata: Metadata = {
	title: 'Часто задаваемые вопросы',
	description: 'Здесь вы можете найти ответ на свой вопрос'
}

type SearchParams = Promise<{
	q?: string
}>

const FaqPage = async ({ searchParams }: { searchParams: SearchParams }) => {
	const { q: searchTerm } = await searchParams

	const data = await getQaListService.exec()

	const filteredFaqs =
		typeof searchTerm === 'string'
			? data.faqs.filter(faq => faq.question.toLowerCase().includes(searchTerm.toLowerCase()))
			: data.faqs

	const compiled = await Promise.all(
		filteredFaqs.map(async e => ({
			...e,
			answer: await compileMDX(e.answer).then(r => r.code)
		}))
	)

	return (
		<main className="container mx-auto max-w-[120rem] px-4 py-20 sm:px-4">
			<h1 className="text-3xl sm:text-2xl font-bold mb-12 text-center">
				Ответы на часто задаваемые вопросы{' '}
			</h1>

			<Card className="mb-8">
				<CardHeader>
					<CardTitle className="text-2xl">Поиск по вопросам</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex items-center space-x-2">
						<SearchWidget searchTerm={searchTerm as string} />
						<Button variant="secondary">
							<Link href="/faq">Отчистить</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
			<Card className="mb-8">
				<CardContent>
					<Accordion type="multiple" className="w-full">
						{compiled.map(faq => (
							<AccordionItem key={faq.id} value={faq.id} id={faq.id}>
								<AccordionTrigger className="flex items-center">
									<span className="flex items-center gap-2">{faq.question} </span>
								</AccordionTrigger>
								<AccordionContent>
									<MdxCode imagePath={data.imagePath} code={faq.answer} />
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</CardContent>
			</Card>

			{filteredFaqs.length === 0 && (
				<p className="text-center text-muted-foreground mt-8">
					По вашему запросу ничего не найдено. Попробуйте изменить поисковый запрос.
				</p>
			)}
		</main>
	)
}

export default FaqPage
