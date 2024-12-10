'use client'

import { Button } from '@front/shared/ui/button'
import { CommandDialog } from '@front/shared/ui/command'
import { navigationMenuTriggerStyle } from '@front/shared/ui/navigation-menu'
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
				variant="secondary"
				size="lg"
				onClick={() => setOpen(true)}
				className={
					navigationMenuTriggerStyle() +
					' xs:border-none border w-30 lg:w-20 xs:w-12 md:w-40 justify-between'
				}
			>
				<span className="xs:sr-only">Поиск..</span>
				<Search className="h-4 w-4 lg:hidden md:flex xs:w-6" />
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
