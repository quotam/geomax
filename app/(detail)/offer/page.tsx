import { articleAbility } from '@front/entities/article/_ability'
import { articleService } from '@front/entities/article/_service'
import { getAppSessionServer } from '@front/kernel/lib/next-auth/getAppSessionServer'
import { Badge } from '@front/shared/ui/badge'
import { Button } from '@front/shared/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@front/shared/ui/card'
import JSONContentRenderer from '@front/shared/ui/contentRender'
import { Calendar, Settings } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default async function OfferPage({
	searchParams
}: {
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	const session = await getAppSessionServer()

	const selectedCategory = searchParams.category

	const items = await articleService('OFFER').getCatFiltered()

	const filteredItems =
		typeof selectedCategory === 'string'
			? items.filter(item => item.category.id === selectedCategory)
			: items

	return (
		<main className="container py-20 px-15 md:px-10 sm:px-4">
			<h1 className="text-3xl font-bold mb-8 text-center">Сезонные предложения</h1>

			<div className="flex flex-wrap gap-2 justify-center mb-12">
				{items.map(i => (
					<Button
						key={i.category.id}
						variant={selectedCategory === i.category.id ? 'secondary' : 'outline'}
					>
						<Link href={`/offer?category=${i.category.id}`}>{i.category.title}</Link>
					</Button>
				))}
			</div>
			<div className="grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 gap-6">
				{filteredItems.map(cat =>
					cat.article.map(item => (
						<Card key={item.id} className="flex relative flex-col">
							{session && articleAbility(session).canUpdate() && (
								<Link
									href={`/admin/OFFER/${item.id}`}
									className="text-primary absolute top-2 right-2"
								>
									<Settings className="w-4 h-4" />
								</Link>
							)}
							<div className="px-6 pt-6">
								<Image
									src={item.image || 'placeholder.svg'}
									alt={item.title}
									width={600}
									height={400}
									className="w-full h-50 object-cover rounded-t-lg"
								/>
							</div>
							<CardHeader>
								<div className="flex justify-between items-center">
									<CardTitle className="text-xl">{item.title}</CardTitle>{' '}
									<Badge variant="secondary">{cat.category.title}</Badge>
								</div>
								<CardDescription>
									<Calendar className="h-4 w-4 inline mr-2 mb-1" />
									{new Date(item.createdAt).toLocaleDateString()}
								</CardDescription>
								<CardContent className="p-0">
									<JSONContentRenderer content={item.desc} />
								</CardContent>
							</CardHeader>
							<CardFooter className="mt-auto">
								<Button className="w-full">
									<Link href={`/offer/${item.id}`}>Воспользоваться предложением</Link>
								</Button>
							</CardFooter>
						</Card>
					))
				)}
			</div>
		</main>
	)
}
