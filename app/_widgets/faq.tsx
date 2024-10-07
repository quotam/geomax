import React from 'react'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@front/shared/ui/accordion'
import Link from 'next/link'

const Faq = () => {
	return (
		<section className="py-30">
			<div className="container flex gap-30 md:gap-18 md:flex-col md:px-8 sm:px-3">
				<div className="flex w-2/5 md:w-full flex-col gap-10 items-start">
					<h4 className="font-bold text-[6.4rem] md:text-heading leading-[6.4rem]">
						Часто задаваемые вопросы FAQ{' '}
					</h4>
					<span className="text-muted-foreground">
						Если вы не нашли ответа на свой вопрос или у вас возникли дополнительные
						уточнения, не стесняйтесь обращаться в нашу службу поддержки. Мы всегда
						готовы помочь вам и ответить на любые ваши вопросы!
					</span>
					<Link
						className="bg-secondary font-medium text-secondary-foreground py-3 rounded-sm px-8 shadow-sm hover:bg-secondary/80"
						href="/?modal"
					>
						Задать вопрос
					</Link>
				</div>
				<Accordion type="multiple" className="w-3/5 md:w-full">
					{Array.from({ length: 6 }).map((_, index) => (
						<AccordionItem value={index.toString()} key={index}>
							<AccordionTrigger>Is it accessible?</AccordionTrigger>
							<AccordionContent>
								Yes. It adheres to the WAI-ARIA design pattern.
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	)
}

export default Faq
