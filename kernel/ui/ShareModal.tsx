import { useMediaQuery } from '@front/kernel/hooks/useMediaQuery'
import { Button } from '@front/shared/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@front/shared/ui/dialog'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle
} from '@front/shared/ui/drawer'
import { Input } from '@front/shared/ui/input'
import { Label } from '@front/shared/ui/label'
import { SuperModal } from '@front/shared/ui/superModal'
import { CopyIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

const Share = ({ link, close }: { link: string; close: () => void }) => {
	return (
		<div className="flex items-center space-x-2">
			<div className="grid flex-1 gap-2">
				<Label htmlFor="link" className="sr-only">
					Link
				</Label>
				<Input id="link" defaultValue={link} readOnly />
			</div>
			<Button
				aria-label="Скопировать ссылку"
				aria-labelledby="Copy"
				type="submit"
				title="Скопировать ссылку"
				onClick={() => {
					if (window.isSecureContext && navigator.clipboard) {
						navigator.clipboard
							.writeText(link)
							.then(() => toast.success('Ссылка скопирована'))
							.catch(() => toast.error('Не удалось скопировать ссылку'))
					}
					close()
				}}
				size="sm"
				className="px-3 w-12 h-12 text-lg"
			>
				<span className="sr-only">Copy</span>
				<CopyIcon className="h-4 w-4" />
			</Button>
		</div>
	)
}

const AppShareModal = ({
	open,
	setOpen,
	link
}: {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	link: string
}) => {
	return (
		<SuperModal
			open={open}
			setOpen={setOpen}
			title="Поделиться"
			content={<Share close={() => setOpen(false)} link={link} />}
			style={{
				dialog: 'max-w-[42rem]'
			}}
		/>
	)
}

export default AppShareModal
