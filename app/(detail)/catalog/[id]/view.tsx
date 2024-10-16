'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react'
import { Button } from '@front/shared/ui/button'
import { Badge } from '@front/shared/ui/badge'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@front/shared/ui/card'
import { ProductStatus } from '@prisma/client'
import JSONContentRenderer from '@front/shared/ui/contentRender'
import { PriceToRub } from '@front/shared/lib/utils'

type Category = {
	title: string
	id: string
}

type Manufacturer = {
	title: string
	id: string
}

type ProductProps = {
	title: string
	body: string
	meta: string
	desc: string | null
	id: string
	status: ProductStatus
	category: Category | null
	price: number | null
	images: string[]
	availability: boolean
	facturer: Manufacturer | null
}

export default function ProductView({ product }: { product: ProductProps }) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0)

	const nextImage = () => {
		setCurrentImageIndex(prevIndex =>
			prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
		)
	}

	const prevImage = () => {
		setCurrentImageIndex(prevIndex =>
			prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
		)
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<Card className="overflow-hidden">
				<CardHeader className="items-start">
					<CardTitle className="text-3xl">{product.title}</CardTitle>
					{product.category && (
						<Badge variant="secondary">{product.category.title}</Badge>
					)}
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 gap-8">
						<div className="relative aspect-square">
							<Image
								src={product.images[currentImageIndex]}
								alt={`Product image ${currentImageIndex + 1}`}
								layout="fill"
								objectFit="cover"
								className="rounded-md"
							/>
							<Button
								variant="secondary"
								size="icon"
								className="absolute top-1/2 left-2 transform -translate-y-1/2"
								onClick={prevImage}
							>
								<ChevronLeft className="h-4 w-4" />
							</Button>
							<Button
								variant="secondary"
								size="icon"
								className="absolute top-1/2 right-2 transform -translate-y-1/2"
								onClick={nextImage}
							>
								<ChevronRight className="h-4 w-4" />
							</Button>
						</div>
						<div className="space-y-4">
							<JSONContentRenderer content={product.body} />
							{product.desc && <JSONContentRenderer content={product.desc} />}
							{product.price && (
								<p className="text-2xl font-bold">{PriceToRub(product.price)}</p>
							)}
							<div className="flex items-center space-x-2">
								<Badge variant={product.availability ? 'default' : 'destructive'}>
									{product.availability && 'В наличии'}
								</Badge>
							</div>
							{product.facturer && <p>Manufacturer: {product.facturer.title}</p>}
						</div>
					</div>
				</CardContent>
				<CardFooter className="flex justify-between">
					<p className="text-sm text-muted-foreground">{product.meta}</p>
					<Button disabled={!product.availability}>
						<ShoppingCart className="mr-2 h-4 w-4" /> Заказать{' '}
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
