import { articleQueries } from '@front/entities/article/_queries'
import { cn } from '@front/shared/lib/utils'
import { Button } from '@front/shared/ui/button'
import { Combobox } from '@front/shared/ui/combobox'
import { CommandItem } from '@front/shared/ui/command'
import { ArticleType } from '@prisma/client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Check, PlusSquare, Trash } from 'lucide-react'
import React from 'react'

const ArticleGroupSelect = ({
	type,
	field
}: {
	type: ArticleType
	field: any
}) => {
	const [search, setSearch] = React.useState('')
	const [open, setOpen] = React.useState(false)

	React.useEffect(() => {
		if (!open) {
			setSearch('')
		}
	}, [open])

	const { data, refetch, isFetching } = useQuery(
		articleQueries(type).getCategories
	)
	const { mutateAsync: createCat } = useMutation(
		articleQueries(type).createCategory(refetch)
	)
	const { mutateAsync: deleteCat } = useMutation(
		articleQueries(type).deleteCategory(refetch)
	)

	return (
		<div className="flex gap-2">
			<Combobox
				disabled={isFetching}
				onSearchValueChange={setSearch}
				open={open}
				customRender={item => (
					<CommandItem
						key={item.value}
						value={item.value}
						className="flex justify-between items-center group"
						onSelect={currentValue => {
							field.onChange(currentValue === field.value ? '' : currentValue)
						}}
					>
						<p className="flex items-center gap-2">
							<Check
								className={cn(
									'mr-2 h-4 w-4',
									field.value === item.value ? 'opacity-100' : 'opacity-0'
								)}
							/>
							{item.label}
						</p>

						<Button
							title="Удалить категорию"
							onClick={e => {
								e.preventDefault()
								deleteCat(item.value)
							}}
							className="hidden group-hover:flex"
							size="icon"
							variant="destructive"
						>
							<Trash className="h-4 w-4" />
						</Button>
					</CommandItem>
				)}
				setOpen={setOpen}
				currentValue={field.value}
				onValueChange={field.onChange}
				style={{
					command: 'w-[60rem]'
				}}
				emptyContent={
					<div>
						<p className="text-muted-foreground mb-2">
							Результатов не найдено.. <br />{' '}
						</p>
						{search && (
							<Button
								title="Создать категорию"
								className="text-primary font-bold gap-2"
								onClick={() => {
									createCat(search).then(({ id }) => field.onChange(id))
									setSearch('')
									setOpen(false)
								}}
								variant="outline"
							>
								<PlusSquare className=" h-4 w-4" />
								<span>{search}</span>{' '}
							</Button>
						)}
					</div>
				}
				placeholder="Выберите категорию статьи"
				values={data?.map(category => ({
					value: category.id,
					label: category.title
				}))}
			/>
		</div>
	)
}

export default ArticleGroupSelect
