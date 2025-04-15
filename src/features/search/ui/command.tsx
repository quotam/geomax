'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { useAppDebounce } from '@front/kernel/hooks/useDebounce'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
	CommandSeparator
} from '@front/shared/ui/command'
import { Input } from '@front/shared/ui/input'
import { useQuery } from '@tanstack/react-query'
import { BadgeRussianRuble, Box, CircleCheck } from 'lucide-react'

import { searchAction } from '../_action'

const SearchCommand = ({ close }: { close: () => void }) => {
	const [search, setSearch] = useState('')
	const makeRequest = useAppDebounce((e: string) => setSearch(e), 500)

	return (
		<Command className="w-full">
			<Input
				className="w-full py-6 rounded-b-none"
				onChange={e => makeRequest(e.target.value)}
				placeholder="Введите поисковый запрос.."
			/>
			<List close={close} e={search} />
		</Command>
	)
}

const List = ({ e, close }: { e: string; close: () => void }) => {
	const { data, isPending } = useQuery({
		queryKey: ['searchQuery', e],
		queryFn: () => searchAction(e)
	})

	const router = useRouter()

	if (isPending) return <div className="text-center p-5">Загрузка..</div>

	return (
		<CommandList className="max-h-[60rem] sm:h-auto sm:max-h-[30rem] ">
			<CommandEmpty>Результаты не найдены..</CommandEmpty>
			{data?.products && data.products.length > 0 && (
				<CommandGroup heading="Продукты">
					{data.products.map(p => (
						<CommandItem
							key={p.slug}
							onSelect={() => {
								router.push('/catalog/' + p.slug)
								close()
							}}
						>
							<Box className="mr-2 h-4 w-4" />
							<span>{p.title}</span>
						</CommandItem>
					))}
				</CommandGroup>
			)}

			{data?.articles && data.articles.length > 0 && (
				<>
					<CommandSeparator />
					<CommandGroup heading="Блог">
						{data.articles.map(p => (
							<CommandItem
								key={p.slug}
								onSelect={() => {
									switch (p.entityType) {
										case 'offer':
											router.push('/offer/' + p.slug)
											break
										case 'project':
											router.push('/project/' + p.slug)
											break
									}
									close()
								}}
							>
								{p.entityType === 'offer' && <BadgeRussianRuble className="mr-2 h-4 w-4" />}
								{p.entityType === 'project' && <CircleCheck className="mr-2 h-4 w-4" />}
								<span>{p.title}</span>
							</CommandItem>
						))}
					</CommandGroup>
				</>
			)}
		</CommandList>
	)
}
export default SearchCommand
