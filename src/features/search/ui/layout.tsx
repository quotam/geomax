'use client'

import React from 'react'

import { Button } from '@front/shared/ui/button'
import { CommandDialog } from '@front/shared/ui/command'
import { DialogHeader } from '@front/shared/ui/dialog'
import { navigationMenuTriggerStyle } from '@front/shared/ui/navigation-menu'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
} from '@front/shared/ui/sheet'
import { SuperModal } from '@front/shared/ui/superModal'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { Search } from 'lucide-react'

import SearchCommand from './command'

export function SearchLayout() {
	const [open, setOpen] = React.useState(false)

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === '/' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setOpen(open => !open)
			}
		}

		document.addEventListener('keydown', down)
		return () => document.removeEventListener('keydown', down)
	}, [])

	return (
		<>
			<Button
				aria-label="Open Search"
				aria-labelledby="Open Search"
				variant="secondary"
				size="lg"
				onClick={() => setOpen(true)}
				className={
					navigationMenuTriggerStyle() +
					' xs:border-none border w-30 lg:w-20 xs:w-12 md:w-40 justify-between sm:justify-center'
				}
			>
				<span className="xs:sr-only">Поиск..</span>
				<Search className="size-4 sm:size-5 lg:hidden md:flex xs:w-6" />
			</Button>
			<SuperModal
				open={open}
				setOpen={setOpen}
				content={<SearchCommand close={() => setOpen(false)} />}
				mobileNode={
					<Sheet open={open} onOpenChange={setOpen}>
						<SheetContent className="p-4" side="top">
							<SheetHeader className="sr-only">
								<SheetTitle>Search</SheetTitle>
								<SheetDescription>Search..</SheetDescription>
							</SheetHeader>
							<SearchCommand close={() => setOpen(false)} />
						</SheetContent>
					</Sheet>
				}
				DesktopNode={
					<CommandDialog open={open} onOpenChange={setOpen}>
						<DialogHeader className="sr-only">
							<DialogTitle>Search</DialogTitle>
							<DialogDescription>Search..</DialogDescription>
						</DialogHeader>
						<SearchCommand close={() => setOpen(false)} />
					</CommandDialog>
				}
			/>
		</>
	)
}
