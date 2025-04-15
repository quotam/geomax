import Image from 'next/image'
import Link from 'next/link'

import { ArticleEntity } from '@front/kernel/domain/types'
import { MdxCode } from '@front/shared/lib/mdx'
import { Card, CardContent, CardFooter } from '@front/shared/ui/card'
import { CalendarIcon } from 'lucide-react'

interface ArticleCardProps {
	article: ArticleEntity
	link: string
}

export function ArticleCard({ article, link }: ArticleCardProps) {
	const { title, description, imagePath, date, thumbnail } = article
	return (
		<Link href={link} title={title} className="group block h-full">
			<Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-lg flex flex-col py-0 gap-2">
				<div className="relative aspect-[16/9] w-full overflow-hidden">
					<Image
						src={thumbnail ? imagePath + thumbnail : '/placeholder.svg?height=400&width=600'}
						alt={title}
						fill
						className="object-cover transition-transform duration-300 group-hover:scale-105"
						priority
					/>
				</div>
				<CardContent className="flex-grow p-5">
					<h3 className="text-2xl font-bold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
						{title}
					</h3>
					<MdxCode code={description} imagePath={imagePath} />
				</CardContent>
				{date && (
					<CardFooter className="pt-0 px-5 pb-5">
						<div className="flex items-center text-xs text-muted-foreground">
							<CalendarIcon className="mr-1 h-3 w-3" />
							<time dateTime={date}>{date}</time>
						</div>
					</CardFooter>
				)}
			</Card>
		</Link>
	)
}
