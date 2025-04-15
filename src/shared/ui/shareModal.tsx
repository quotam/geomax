'use client'

import React from 'react'

import { Button } from '@front/shared/ui/button'
import { Input } from '@front/shared/ui/input'
import { Label } from '@front/shared/ui/label'
import { SuperModal } from '@front/shared/ui/superModal'
import { CopyIcon, Share2 } from 'lucide-react'
import { toast } from 'sonner'

const Share = ({ link, close }: { link?: string; close: () => void }) => {
	return (
		<div className="flex items-center space-x-2">
			<div className="grid flex-1 gap-2">
				<Label htmlFor="link" className="sr-only">
					Link
				</Label>
				<Input id="link" defaultValue={link || window.location.href} readOnly />
			</div>
			<Button
				aria-label="Скопировать ссылку"
				aria-labelledby="Copy"
				type="submit"
				title="Скопировать ссылку"
				onClick={() => {
					if (window.isSecureContext && navigator.clipboard) {
						navigator.clipboard
							.writeText(link || window.location.href)
							.then(() => toast.success('Ссылка скопирована'))
							.catch(() => toast.error('Не удалось скопировать ссылку'))
					}
					close()
				}}
				size="icon"
				className={'px-3 text-lg'}
			>
				<span className="sr-only">Copy</span>
				<CopyIcon className="h-4 w-4" />
			</Button>
		</div>
	)
}

const AppShareModal = ({ link, className }: { link?: string; className?: string }) => {
	const [open, setOpen] = React.useState(false)

	return (
		<>
			<Button className={className} onClick={() => setOpen(true)} variant="outline">
				<Share2 className="mr-2 h-4 w-4" />
				Поделиться
			</Button>
			<SuperModal
				open={open}
				setOpen={setOpen}
				title="Поделиться"
				content={<Share close={() => setOpen(false)} link={link} />}
				style={{
					dialog: 'max-w-[42rem]'
				}}
			/>
		</>
	)
}

export default AppShareModal
