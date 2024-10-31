import { cn } from '@front/shared/lib/utils'
import { Button } from '@front/shared/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@front/shared/ui/popover'
import { Check, Trash } from 'lucide-react'
import { useEditor } from 'novel'
import { useEffect, useRef } from 'react'

export function isValidUrl(url: string) {
	try {
		new URL(url)
		return true
	} catch (e) {
		return false
	}
}
export function getUrlFromString(str: string) {
	if (isValidUrl(str)) return str
	try {
		if (str.includes('.') && !str.includes(' ')) {
			return new URL(`https://${str}`).toString()
		}
	} catch (e) {
		return null
	}
}
interface LinkSelectorProps {
	open: boolean
	onOpenChange: (open: boolean) => void
}

export const LinkSelector = ({ open, onOpenChange }: LinkSelectorProps) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const { editor } = useEditor()

	useEffect(() => {
		inputRef.current && inputRef.current?.focus()
	})
	if (!editor) return null

	return (
		<Popover modal={true} open={open} onOpenChange={onOpenChange}>
			<PopoverTrigger asChild>
				<Button size="sm" variant="ghost" className="gap-2 rounded-none border-none">
					<p className="text-base">↗</p>
					<p
						className={cn('underline decoration-stone-400 underline-offset-4', {
							'text-primary': editor.isActive('link')
						})}
					>
						Link
					</p>
				</Button>
			</PopoverTrigger>
			<PopoverContent align="start" className="w-60 p-0" sideOffset={10}>
				<input
					ref={inputRef}
					type="text"
					placeholder="Paste a link"
					className="flex-1 bg-background p-1 text-sm outline-none"
					defaultValue={editor.getAttributes('link').href || ''}
				/>
				{editor.getAttributes('link').href ? (
					<Button
						size="icon"
						variant="outline"
						type="button"
						className="flex h-8 items-center rounded-sm p-1 text-red-600 transition-all hover:bg-red-100 dark:hover:bg-red-800"
						onClick={e => {
							e.preventDefault()
							editor.chain().focus().unsetLink().run()
							onOpenChange(false)
						}}
					>
						<Trash className="h-4 w-4" />
					</Button>
				) : (
					<Button
						onClick={e => {
							e.preventDefault()
							const url = inputRef.current?.value
							if (url) {
								editor.chain().focus().setLink({ href: url }).run()
								onOpenChange(false)
							}
						}}
						size="icon"
						className="h-8"
					>
						<Check className="h-4 w-4" />
					</Button>
				)}
			</PopoverContent>
		</Popover>
	)
}
