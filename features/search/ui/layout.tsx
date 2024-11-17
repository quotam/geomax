'use client'

import { Button } from '@front/shared/ui/button'
import { CommandDialog } from '@front/shared/ui/command'
import { Sheet, SheetContent } from '@front/shared/ui/sheet'
import { SuperModal } from '@front/shared/ui/superModal'
import { Search } from 'lucide-react'
import React from 'react'

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
				variant="ghost"
				size="lg"
				onClick={() => setOpen(true)}
				className="border-[.1rem] border-foreground/10 text-secondary-foreground/70 hover:bg-secondary hover:text-secondary-foreground cursor-pointer transition-colors flex items-center justify-between rounded-lg bg-secondary/60 lg:w-38 md:w-52  w-52 py-2 text-left px-4"
			>
				<span>Поиск..</span>
				<Search className="h-4 w-4" />
			</Button>
			<SuperModal
				open={open}
				setOpen={setOpen}
				content={<SearchCommand close={() => setOpen(false)} />}
				mobileNode={
					<Sheet open={open} onOpenChange={setOpen}>
						<SheetContent className="p-4" side="top">
							<SearchCommand close={() => setOpen(false)} />
						</SheetContent>
					</Sheet>
				}
				DesktopNode={
					<CommandDialog open={open} onOpenChange={setOpen}>
						<SearchCommand close={() => setOpen(false)} />
					</CommandDialog>
				}
			/>
		</>
	)
}
