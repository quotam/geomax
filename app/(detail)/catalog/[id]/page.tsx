import NotFound from '@front/app/not-found'
import { productService } from '@front/entities/product/_service'
import { cn, PriceToRub } from '@front/shared/lib/utils'
import { Button } from '@front/shared/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader
} from '@front/shared/ui/card'
import JSONContentRenderer from '@front/shared/ui/contentRender'
import AppShareModal from '@front/shared/ui/shareModal'
import Image from 'next/image'
import ProductView from './view'

export default async function ProductPage({
	params
}: {
	params: { id: string }
}) {
	const data = await productService.getOnce(params.id)
	if (!data) return <NotFound />
	return <ProductView product={data} />

	//return (
	//	<div className="container py-12 px-4">
	//		<Card className="mx-auto max-w-[120rem] bg-white shadow-xl">
	//			<CardHeader>
	//				<h1 className="text-3xl font-bold text-gray-900 mb-2">{data.title}</h1>
	//				<div className="flex items-center space-x-4">
	//					<div className="flex items-center text-sm text-gray-500">
	//						{data.price && PriceToRub(data.price)}
	//					</div>
	//				</div>
	//			</CardHeader>
	//			<CardContent>
	//				<Image
	//					src={data.images[0] || '/placeholder.svg'}
	//					alt="presentation"
	//					width={800}
	//					height={400}
	//					className={cn(
	//						'w-full h-auto object-cover rounded-lg mb-6',
	//						!data.images[0] && 'max-h-100'
	//					)}
	//				/>
	//				<div className="prose max-w-none">
	//					<JSONContentRenderer content={data.body} />
	//				</div>
	//			</CardContent>
	//			<CardFooter className="flex flex-wrap justify-between items-center">
	//				<div className="flex  space-x-2">
	//					<AppShareModal />
	//				</div>
	//				<Button>Заказать</Button>
	//			</CardFooter>
	//		</Card>
	//	</div>
	//)
}
