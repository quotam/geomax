import { CaretSortIcon } from '@radix-ui/react-icons'
import { Check, Plus } from 'lucide-react'
import * as React from 'react'

import { cn } from '../lib/utils'
import { Button } from './button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from './command'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

export function Combobox({
	currentValue: defaultValue,
	disabled,
	customRender,
	onValueChange,
	onSearchValueChange,
	style,
	open,
	setOpen,
	values,
	emptyContent,
	placeholder
}: {
	placeholder?: string
	customRender?: (e: { value: string; label: string }) => React.ReactNode
	emptyContent?: React.ReactNode

	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>

	currentValue?: string
	values?: { value: string; label: string }[]
	onValueChange: (value: string) => void
	onSearchValueChange?: (value: string) => void

	disabled?: boolean
	style?: {
		button?: string
		content?: string
		command?: string
	}
}) {
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					disabled={disabled}
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={cn(
						'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
						style?.button
					)}
				>
					<span>
						{defaultValue
							? values?.find(e => e.value === defaultValue)?.label
							: placeholder || 'Выберите значение..'}
					</span>

					<CaretSortIcon className="h-4 w-4 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className={cn('p-0 w-full', style?.content)}>
				<Command className={style?.command}>
					<CommandInput
						icon={
							values?.length === 0 ? <Plus className="mr-2 h-4 w-4 shrink-0 opacity-50" /> : undefined
						}
						onValueChange={onSearchValueChange}
						placeholder={values?.length === 0 ? 'Нзвание..' : 'Поиск...'}
					/>
					<CommandList>
						<CommandEmpty>{emptyContent ? emptyContent : 'Ничего не найдено'}</CommandEmpty>
						<CommandGroup>
							{values?.map(
								customRender
									? customRender
									: e => (
											<CommandItem
												key={e.value}
												value={e.value}
												onSelect={currentValue => {
													onValueChange(currentValue === defaultValue ? '' : currentValue)
													setOpen(false)
												}}
											>
												<Check
													className={cn('mr-2 h-4 w-4', defaultValue === e.value ? 'opacity-100' : 'opacity-0')}
												/>
												{e.label}
											</CommandItem>
										)
							)}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
