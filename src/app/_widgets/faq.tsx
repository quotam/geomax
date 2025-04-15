import Link from 'next/link'

import { getLastQaListService } from '@front/entities/qa/_service/get-last-qa-list'
import { MdxCode } from '@front/shared/lib/mdx'
import { compileMDX } from '@front/shared/lib/mdx/server'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@front/shared/ui/accordion'

const Faq = async () => {
	const data = await getLastQaListService.exec()

	const compiled = await Promise.all(
		data.faqs.map(async e => ({
			...e,
			answer: await compileMDX(e.answer).then(r => r.code)
		}))
	)

	if (compiled.length === 0) return null

	return (
		<section className="py-30" id="faq">
			<div className="container flex gap-30 md:gap-18 md:flex-col md:px-8 sm:px-3">
				<div className="flex w-2/5 md:w-full flex-col gap-10 items-start">
					<h4 className="font-bold text-[6.4rem] md:text-heading leading-[6.4rem]">
						Часто задаваемые вопросы FAQ
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
					{compiled.map((item, index) => (
						<AccordionItem value={item.id} key={index}>
							<AccordionTrigger>{item.question}</AccordionTrigger>
							<AccordionContent>
								<MdxCode code={item.answer} imagePath={data.imagePath} />
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	)
}

export default Faq
