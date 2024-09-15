import { ReactNode } from 'react'
import { useMediaQuery } from '@front/kernel/hooks/useMediaQuery'
import { Button } from '@front/shared/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@front/shared/ui/dialog'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger
} from '@front/shared/ui/drawer'
import { cn } from '../lib/utils'

export const SuperModal = ({
	open,
	setOpen,
	content,
	closeButt = false,
	title,
	trigger,
	DesktopNode: customDesktopNode,
	mobileNode: customMobileNode,
	style
}: {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	content?: ReactNode
	closeButt?: boolean
	title?: ReactNode
	trigger?: ReactNode
	DesktopNode?: ReactNode
	mobileNode?: ReactNode
	style?: {
		dialog?: string
		drawer?: string
		drawerTrigger?: string
	}
}) => {
	const isDesktop = useMediaQuery('(min-width: 768px)')

	if (isDesktop) {
		if (customDesktopNode) return customDesktopNode
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				{trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
				<DialogContent className={cn('sm:max-w-[42rem] rounded-lg', style?.dialog)}>
					{title && (
						<DialogHeader>
							<DialogTitle>{title}</DialogTitle>
						</DialogHeader>
					)}
					{content}
				</DialogContent>
			</Dialog>
		)
	}

	if (customMobileNode) return customMobileNode
	return (
		<Drawer open={open} onOpenChange={setOpen}>
			{trigger && (
				<DrawerTrigger className={style?.drawerTrigger}>{trigger}</DrawerTrigger>
			)}
			<DrawerContent className={cn('p-4', style?.drawer)}>
				{title && (
					<DrawerHeader className="text-left">
						<DrawerTitle>{title}</DrawerTitle>
					</DrawerHeader>
				)}
				{content}
				{closeButt && (
					<DrawerFooter className="pt-2">
						<DrawerClose asChild>
							<Button
								aria-label="Close"
								aria-labelledby="Закрыть"
								name="close"
								variant="outline"
							>
								Закрыть
							</Button>
						</DrawerClose>
					</DrawerFooter>
				)}
			</DrawerContent>
		</Drawer>
	)
}
