import SearchWidget from '@front/app/_widgets/searchWidget'
import { articleAbility } from '@front/entities/article/_ability'
import { articleService } from '@front/entities/article/_service'
import { getAppSessionServer } from '@front/kernel/lib/next-auth/getAppSessionServer'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@front/shared/ui/accordion'
import { Button } from '@front/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@front/shared/ui/card'
import JSONContentRenderer from '@front/shared/ui/contentRender'
import { Settings } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
	title: 'Часто задаваемые вопросы',
	description: 'Часто задаваемые вопросы'
}

const FaqPage = async ({
	searchParams
}: {
	searchParams: { [key: string]: string | string[] | undefined }
}) => {
	const session = await getAppSessionServer()

	const searchTerm = searchParams.q
	const items = await articleService('FAQ').getCatFiltered()

	const filteredFaqs =
		typeof searchTerm === 'string'
			? items.filter(faq =>
					faq.article.some(
						article =>
							article.title.toLowerCase().includes(searchTerm) ||
							article.meta.toLowerCase().includes(searchTerm)
					)
				)
			: items

	return (
		<main className="container mx-auto w-[90%] px-4 py-20">
			<h1 className="text-3xl font-bold mb-12 text-center">Ответы на часто задаваемые вопросы </h1>

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
			{filteredFaqs.map(faq => (
				<Accordion key={faq.category.id} type="single" className="w-full" collapsible>
					<h4 className="text-2xl font-bold text-foreground">{faq.category.title}</h4>
					{faq.article.map(faq => (
						<AccordionItem key={faq.id} value={faq.id} id={faq.id}>
							<AccordionTrigger className="flex items-center">
								<span className="flex items-center gap-2">
									{faq.title}{' '}
									{articleAbility(session!).canUpdate() && (
										<Link href={`/admin/FAQ/${faq.id}`} className="text-primary">
											<Settings className="w-4 h-4" />
										</Link>
									)}
								</span>{' '}
							</AccordionTrigger>
							<AccordionContent>
								<JSONContentRenderer content={faq.desc} />
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			))}

			{filteredFaqs.length === 0 && (
				<p className="text-center text-muted-foreground mt-8">
					По вашему запросу ничего не найдено. Попробуйте изменить поисковый запрос.
				</p>
			)}
		</main>
	)
}

export default FaqPage
