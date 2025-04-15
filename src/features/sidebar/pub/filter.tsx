'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@front/shared/ui/button'
import { Checkbox } from '@front/shared/ui/checkbox'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@front/shared/ui/dropdown-menu'
import { Label } from '@front/shared/ui/label'
import { Filter } from 'lucide-react'

export type CatalogSearchParams = Promise<SearchParams>

type SearchParams = {
	inStock?: boolean
	sort?: 'PriceAsc' | 'PriceDesc' | 'newest' | 'oldest'
}

export const SortWidget = ({ search }: { search: SearchParams }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					<span>Сортировать</span>
					<Filter className="ml-2 h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem asChild>
					<Link
						href={{
							query: {
								...search,
								sort: 'PriceAsc'
							}
						}}
					>
						Цена: по возрастанию
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link
						href={{
							query: {
								...search,
								sort: 'PriceDesc'
							}
						}}
					>
						Цена: по убыванию
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link
						href={{
							query: {
								...search,
								sort: 'newest'
							}
						}}
					>
						Порядок: сначала новые
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link
						href={{
							query: {
								...search,
								sort: 'oldest'
							}
						}}
					>
						Порядок: сначала старые
					</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

const AvabilityFilter = () => {
	const searchParams = useSearchParams()
	const router = useRouter()

	const [inStock, setInStock] = useState<boolean>(searchParams.get('inStock') === 'true' || false)

	useEffect(() => {
		setInStock(searchParams.get('inStock') === 'true' || false)
	}, [searchParams])

	return (
		<div className="flex items-center space-x-2 my-4">
			<Checkbox
				id="inStock"
				checked={inStock}
				onCheckedChange={e =>
					e === true ? router.push('/catalog?inStock=true') : router.push('/catalog')
				}
			/>
			<Label htmlFor="inStock">Только в наличии</Label>
		</div>
	)
}

export default AvabilityFilter
