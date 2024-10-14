'use client'
import { useState } from 'react'
import UserToolTip from '@front/entities/user/_ui/userToolTip'
import { getProfileDisplayName } from '@front/entities/user/profile'
import Link from 'next/link'
import { Button } from '@front/shared/ui/button'
import { Input } from '@front/shared/ui/input'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@front/shared/ui/table'
import {
	Calendar,
	ChevronDownIcon,
	ChevronUpIcon,
	Edit,
	Eye,
	Pen,
	PlusCircle,
	PlusSquare,
	Trash2
} from 'lucide-react'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from '@front/shared/ui/tooltip'
import { ArticleStatus, ArticleType } from '@prisma/client'
import { Article } from '../domain/type'

type props = {
	articles: Article[]
	entityType: ArticleType
	link?: (id: string) => string
	createArticle: () => void
	isPendingCreate: boolean
	deleteArticle: (id: string) => void
}

const ArticleList = ({
	articles,
	link,
	entityType,
	isPendingCreate,
	createArticle,
	deleteArticle
}: props) => {
	const [sortColumn, setSortColumn] = useState<keyof Article>('createdAt')
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
	const [searchTerm, setSearchTerm] = useState('')

	const sortedArticles = [...articles]
		.filter(article => {
			const titleMatches = article.title
				.toLowerCase()
				.includes(searchTerm.toLowerCase())
			const userNameMatches = article.user
				? getProfileDisplayName(article.user)
						.toLowerCase()
						.includes(searchTerm.toLowerCase())
				: false

			return titleMatches || userNameMatches
		})
		.sort((a, b) => {
			if (a[sortColumn] === null) return sortDirection === 'asc' ? -1 : 1
			if (b[sortColumn] === null) return sortDirection === 'asc' ? 1 : -1

			if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
			if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
			return 0
		})

	const handleSort = (column: keyof Article) => {
		if (column === sortColumn) {
			setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
		} else {
			setSortColumn(column)
			setSortDirection('asc')
		}
	}
	return (
		<div>
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-2xl font-bold">Управление {entityType}</h1>
				<Input
					placeholder="Поиск по названию или автору"
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					className="max-w-100"
				/>
				<Button
					onClick={createArticle}
					disabled={isPendingCreate}
					variant="secondary"
				>
					<PlusCircle className="mr-2 h-4 w-4" /> Добавить {entityType.toLowerCase()}
				</Button>
			</div>
			<div className="rounded-md border bg-card">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead
								onClick={() => handleSort('title')}
								className="cursor-pointer"
							>
								Название
								{sortColumn === 'title' &&
									(sortDirection === 'asc' ? (
										<ChevronUpIcon className="inline ml-1" />
									) : (
										<ChevronDownIcon className="inline ml-1" />
									))}
							</TableHead>
							<TableHead
								onClick={() => handleSort('status')}
								className="cursor-pointer"
							>
								Статус
								{sortColumn === 'status' &&
									(sortDirection === 'asc' ? (
										<ChevronUpIcon className="inline ml-1" />
									) : (
										<ChevronDownIcon className="inline ml-1" />
									))}
							</TableHead>
							<TableHead onClick={() => handleSort('user')} className="cursor-pointer">
								Автор
								{sortColumn === 'user' &&
									(sortDirection === 'asc' ? (
										<ChevronUpIcon className="inline ml-1" />
									) : (
										<ChevronDownIcon className="inline ml-1" />
									))}
							</TableHead>
							<TableHead
								onClick={() => handleSort('category')}
								className="cursor-pointer"
							>
								Категории
								{sortColumn === 'category' &&
									(sortDirection === 'asc' ? (
										<ChevronUpIcon className="inline ml-1" />
									) : (
										<ChevronDownIcon className="inline ml-1" />
									))}
							</TableHead>

							<TableHead
								onClick={() => handleSort('createdAt')}
								className="cursor-pointer"
							>
								Дата создания
								{sortColumn === 'createdAt' &&
									(sortDirection === 'asc' ? (
										<ChevronUpIcon className="inline ml-1" />
									) : (
										<ChevronDownIcon className="inline ml-1" />
									))}
							</TableHead>
							<TableHead className="text-right">Действия</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{sortedArticles.map(article => (
							<TableRow key={article.id}>
								<TableCell className="font-medium max-w-50 truncate">
									{article.title || '[Без названия]'}
								</TableCell>
								<TableCell>{article.status}</TableCell>
								<TableCell>
									<UserToolTip profile={article.user} />
								</TableCell>
								<TableCell>{article.category?.title || '[Без категории]'}</TableCell>
								<TableCell>
									<Tooltip>
										<TooltipTrigger className="cursor-pointer p-0 m-0 font-bold">
											<Calendar className="mr-2 h-4 w-4 mb-1 inline" />{' '}
											{new Date(article.createdAt).toLocaleDateString()}
										</TooltipTrigger>
										<TooltipContent className="text-center">
											<Pen className="mr-2 h-3 w-3 inline" /> Последнее изменение <br />
											{article.updatedAt.toLocaleDateString()} -
											{article.updatedAt.toLocaleTimeString()}
										</TooltipContent>
									</Tooltip>
								</TableCell>
								<TableCell className="text-right">
									{link && (
										<Button
											className="mr-2"
											variant="outline"
											title="Просмотр"
											size="icon"
										>
											<Link href={link(article.id)}>
												<Eye className="h-4 w-4" />
											</Link>
										</Button>
									)}
									<Button variant="outline" size="icon">
										<Link href={`/admin/${entityType}/${article.id}`}>
											<Edit className="h-4 w-4" />
										</Link>
									</Button>
									<Button
										className="ml-2"
										variant="destructive"
										onClick={() =>
											article.status === ArticleStatus.PUBLISHED
												? confirm('Вы уверены? Статус записи ' + article.status) &&
													deleteArticle(article.id)
												: deleteArticle(article.id)
										}
										size="icon"
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				{sortedArticles.length === 0 && (
					<div className="flex flex-col items-center m-8">
						<p>Ничего не найдено..</p>
						<Button
							className="mx-auto mt-4"
							variant="outline"
							onClick={createArticle}
							disabled={isPendingCreate}
						>
							Добавить {entityType.toLowerCase()}{' '}
							<PlusSquare className="ml-2 h-4 w-4" />
						</Button>
					</div>
				)}
			</div>
		</div>
	)
}

export default ArticleList
