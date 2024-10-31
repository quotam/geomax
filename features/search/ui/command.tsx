'use client'

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
import { BadgeRussianRuble, Box, CircleCheck, NewspaperIcon, TableOfContents } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { searchAction } from '../_action'

const SearchCommand = ({ close }: { close: () => void }) => {
	const [search, setSearch] = useState('')
	const makeRequest = useAppDebounce((e: string) => setSearch(e), 500)

	return (
		<Command className="w-full">
			<Input
				className="w-full py-6 rounded-b-0"
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
							key={p.id}
							onSelect={() => {
								router.push('/catalog/' + p.id)
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
								key={p.id}
								onSelect={() => {
									switch (p.type) {
										case 'NEWS':
											router.push('/news/' + p.id)
											break
										case 'FAQ':
											router.push('/faq/#' + p.id)
											break
										case 'OFFER':
											router.push('/offer/' + p.id)
											break
										case 'PROJECT':
											router.push('/project/' + p.id)
											break
									}
									close()
								}}
							>
								{p.type === 'NEWS' && <NewspaperIcon className="mr-2 h-4 w-4" />}
								{p.type === 'FAQ' && <TableOfContents className="mr-2 h-4 w-4" />}
								{p.type === 'OFFER' && <BadgeRussianRuble className="mr-2 h-4 w-4" />}
								{p.type === 'PROJECT' && <CircleCheck className="mr-2 h-4 w-4" />}
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
