'use client'

import { useAppDebounce } from '@front/kernel/hooks/useDebounce'
import { Input } from '@front/shared/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@front/shared/ui/select'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const SearchWidget = ({
	searchTerm,
	categoryId,
	categories
}: {
	searchTerm: string
	categoryId?: string
	categories?: { id: string; title: string }[]
}) => {
	const [search, setSearchTerm] = React.useState(searchTerm)
	const [category, setCategory] = React.useState(categoryId)

	const router = useRouter()

	const handleSearch = useAppDebounce(() => {
		const url = new URL(window.location.href)
		if (search) {
			url.searchParams.set('q', search)
		} else {
			url.searchParams.delete('q')
		}
		if (category) {
			url.searchParams.set('category', category)
		}
		router.push(url.toString())
	}, 400)

	useEffect(handleSearch, [search, category, handleSearch])

	return (
		<>
			<div className="relative flex-grow">
				<Search className="absolute left-3 w-4 h-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
				<Input
					type="search"
					name="q"
					onChange={e => setSearchTerm(e.target.value)}
					placeholder="Введите ваш вопрос..."
					defaultValue={searchTerm}
					className="pl-10"
				/>
			</div>
			{categories && (
				<Select value={categoryId} onValueChange={e => setCategory(e)}>
					<SelectTrigger className="w-1/3">
						<SelectValue placeholder="Выберите категорию" />
					</SelectTrigger>
					<SelectContent>
						{categories.map(i => (
							<SelectItem key={i.title} value={i.id}>
								{i.title}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			)}
		</>
	)
}

export default SearchWidget
