import { articleService } from '@front/entities/article/_service'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@front/shared/ui/accordion'
import JSONContentRenderer from '@front/shared/ui/contentRender'
import { ArticleType } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

const Faq = async () => {
	const data = await articleService(ArticleType.FAQ).getPreview()

	if (data.length >= 3)
		return (
			<section className="py-30" id="faq">
				<div className="container flex gap-30 md:gap-18 md:flex-col md:px-8 sm:px-3">
					<div className="flex w-2/5 md:w-full flex-col gap-10 items-start">
						<h4 className="font-bold text-[6.4rem] md:text-heading leading-[6.4rem]">
							Часто задаваемые вопросы FAQ{' '}
						</h4>
						<span className="text-muted-foreground">
							Если вы не нашли ответа на свой вопрос или у вас возникли дополнительные уточнения, не
							стесняйтесь обращаться в нашу службу поддержки. Мы всегда готовы помочь вам и ответить на
							любые ваши вопросы!
						</span>
						<Link
							className="bg-secondary font-medium text-secondary-foreground py-3 rounded-sm px-8 shadow-sm hover:bg-secondary/80"
							href="/?modal#faq"
						>
							Задать вопрос
						</Link>
					</div>
					<Accordion type="multiple" className="w-3/5 md:w-full">
						{data.map((item, index) => (
							<AccordionItem value={item.id} key={index}>
								<AccordionTrigger>{item.title}</AccordionTrigger>
								<AccordionContent>
									<JSONContentRenderer content={item.body} />{' '}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</section>
		)

	return null
}

export default Faq
