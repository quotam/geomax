import Image from 'next/image'
import Link from 'next/link'

import { ProductEntity } from '@front/entities/product/product'
import OrderButt from '@front/features/orderButt'
import { MdxCode } from '@front/shared/lib/mdx'
import { PriceToRub, cn } from '@front/shared/lib/utils'
import { Badge } from '@front/shared/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@front/shared/ui/card'

interface Props {
	product: ProductEntity
	link: string
	className?: string
}

export function ProductCard({ product, className, link }: Props) {
	return (
		<Card
			className={cn(
				'h-full overflow-hidden transition-all gap-0 hover:shadow-md p-0 group',
				className
			)}
		>
			<Link href={link} title={product.title}>
				<div className="aspect-[5/4] relative overflow-hidden">
					<Image
						src={product.thumbnail ? product.imagePath + product.thumbnail : '/placeholder.svg'}
						alt={product.title}
						fill
						className="object-cover transition-transform group-hover:scale-105"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
					{product.avability === false && (
						<Badge variant="destructive" className="absolute top-2 right-2">
							Нет в наличии
						</Badge>
					)}
					{product.facturer && (
						<Badge variant="secondary" className="absolute top-2 left-2">
							{product.facturer.title}
						</Badge>
					)}
				</div>
			</Link>
			<div className="flex flex-col h-full justify-between">
				<CardHeader className="p-4 gap-0">
					<div className="flex justify-between items-center gap-2">
						<Link title={product.title} href={link}>
							<h3 className="font-medium group-hover:text-primary transition-colors text-lg line-clamp-2">
								{product.title}
							</h3>
						</Link>
						{product.price !== undefined && (
							<div className="font-bold text-lg whitespace-nowrap">Oт {PriceToRub(product.price)}</div>
						)}
					</div>
				</CardHeader>
				<CardContent className="p-4 pt-0">
					<MdxCode code={product.description} imagePath={product.imagePath} />
				</CardContent>
				<CardFooter className="p-4 pt-0 flex items-center justify-between">
					{product.categories && product.categories.length > 0 && (
						<div className="flex flex-wrap gap-1 truncate overflow-hidden max-w-48">
							{product.categories.slice(0, 2).map(category => (
								<Badge
									key={category.id}
									variant="outline"
									className="text-xs truncate max-w-30 inline"
									title={category.title}
								>
									{category.title}
								</Badge>
							))}
							{product.categories.length > 2 && (
								<Badge
									variant="outline"
									title={product.categories.map(e => e.title).join(', ')}
									className="text-xs"
								>
									+ {product.categories.length - 2}
								</Badge>
							)}
						</div>
					)}
					<OrderButt productId={product.id} className="h-8 max-w-24" icon={false} />
				</CardFooter>
			</div>
		</Card>
	)
}
