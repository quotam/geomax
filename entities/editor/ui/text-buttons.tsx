import { cn } from '@front/shared/lib/utils'
import { Button } from '@front/shared/ui/button'
import {
	AlignCenterIcon,
	AlignLeftIcon,
	AlignRightIcon,
	BoldIcon,
	CodeIcon,
	ItalicIcon,
	StrikethroughIcon,
	UnderlineIcon,
	Zap
} from 'lucide-react'
import { EditorBubbleItem, useEditor } from 'novel'

import { SelectorItem } from './nodeSelector'

export const TextButtons = () => {
	const { editor } = useEditor()
	if (!editor) return null

	const items: SelectorItem[] = [
		{
			name: 'button',
			command: editor => editor!!.chain().toggleMark('buttonLink').run(),
			isActive: editor => editor!!.isActive('buttonLink'),
			icon: Zap
		},

		{
			name: 'align-left',
			command: editor => editor!!.chain().focus().setTextAlign('left').run(),
			isActive: editor => editor!!.isActive({ textAlign: 'left' }),
			icon: AlignLeftIcon
		},

		{
			name: 'align-center',
			command: editor => editor!!.chain().focus().setTextAlign('center').run(),
			isActive: editor => editor!!.isActive({ textAlign: 'center' }),
			icon: AlignCenterIcon
		},
		{
			name: 'align-right',
			command: editor => editor!!.chain().focus().setTextAlign('right').run(),
			isActive: editor => editor!!.isActive({ textAlign: 'right' }),
			icon: AlignRightIcon
		},

		{
			name: 'bold',
			isActive: editor => editor!!.isActive('bold'),
			command: editor => editor!!.chain().focus().toggleBold().run(),
			icon: BoldIcon
		},

		{
			name: 'italic',
			isActive: editor => editor!!.isActive('italic'),
			command: editor => editor!!.chain().focus().toggleItalic().run(),
			icon: ItalicIcon
		},
		{
			name: 'underline',
			isActive: editor => editor!!.isActive('underline'),
			command: editor => editor!!.chain().focus().toggleUnderline().run(),
			icon: UnderlineIcon
		},
		{
			name: 'strike',
			isActive: editor => editor!!.isActive('strike'),
			command: editor => editor!!.chain().focus().toggleStrike().run(),
			icon: StrikethroughIcon
		},
		{
			name: 'code',
			isActive: editor => editor!!.isActive('code'),
			command: editor => editor!!.chain().focus().toggleCode().run(),
			icon: CodeIcon
		}
	]

	return (
		<div className="flex">
			{items.map((item, index) => (
				<EditorBubbleItem
					key={index}
					onSelect={editor => {
						item.command(editor)
					}}
				>
					<Button size="sm" className="rounded-none" onClick={e => e.preventDefault()} variant="ghost">
						<item.icon
							className={cn('h-4 w-4', {
								'text-primary': item.isActive(editor)
							})}
						/>
					</Button>
				</EditorBubbleItem>
			))}
		</div>
	)
}
