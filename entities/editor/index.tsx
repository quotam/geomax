'use client'
import { Separator } from '@front/shared/ui/separator'
import {
	EditorBubble,
	EditorCommand,
	EditorCommandEmpty,
	EditorCommandItem,
	EditorCommandList,
	EditorContent,
	EditorRoot,
	JSONContent
} from 'novel'
import { handleCommandNavigation } from 'novel/extensions'
import { handleImageDrop, handleImagePaste } from 'novel/plugins'
import { useState } from 'react'
import { defaultExtensions } from './model/extensions'
import { slashCommand, suggestionItems } from './model/suggestionItems'
import { ColorSelector } from './ui/colorSelector'
import { LinkSelector } from './ui/linkSelector'
import { NodeSelector } from './ui/nodeSelector'
import { TextButtons } from './ui/text-buttons'
import { uploadFn } from './vm/uploadImage'
import { cn } from '@front/shared/lib/utils'

const extensions = [...defaultExtensions, slashCommand]

interface EditorProp {
	initialValue?: JSONContent
	onChange: (value: JSONContent) => void
	className?: string
}
const Editor = ({ initialValue, onChange, className }: EditorProp) => {
	const [openNode, setOpenNode] = useState(false)
	const [openColor, setOpenColor] = useState(false)
	const [openLink, setOpenLink] = useState(false)

	return (
		<EditorRoot>
			<EditorContent
				className={cn('min-h-50 border border-input rounded-md', className)}
				immediatelyRender={false}
				{...(initialValue && { initialContent: initialValue })}
				extensions={extensions}
				editorProps={{
					handleDOMEvents: {
						keydown: (_view, event) => handleCommandNavigation(event)
					},
					handlePaste: (view, event) => handleImagePaste(view, event, uploadFn),
					handleDrop: (view, event, _slice, moved) =>
						handleImageDrop(view, event, moved, uploadFn),
					attributes: {
						class: `prose dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full rounded-md min-h-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 p-4`
					}
				}}
				onUpdate={({ editor }) => {
					onChange(editor.getJSON())
				}}
			>
				<EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
					<EditorCommandEmpty className="px-2 text-muted-foreground">
						No results
					</EditorCommandEmpty>
					<EditorCommandList>
						{suggestionItems.map(item => (
							<EditorCommandItem
								value={item.title}
								onCommand={val => item.command?.(val)}
								className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent `}
								key={item.title}
							>
								<div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
									{item.icon}
								</div>
								<div>
									<p className="font-medium">{item.title}</p>
									<p className="text-xs text-muted-foreground">{item.description}</p>
								</div>
							</EditorCommandItem>
						))}
					</EditorCommandList>
				</EditorCommand>
				<EditorBubble
					tippyOptions={{
						placement: 'top'
					}}
					className="flex w-fit max-w-[50vw] text-foreground overflow-hidden rounded-md border border-muted bg-background shadow-xl"
				>
					<Separator orientation="vertical" />
					<NodeSelector open={openNode} onOpenChange={setOpenNode} />
					<Separator orientation="vertical" />

					<LinkSelector open={openLink} onOpenChange={setOpenLink} />
					<Separator orientation="vertical" />
					<TextButtons />
					<Separator orientation="vertical" />
					<ColorSelector open={openColor} onOpenChange={setOpenColor} />
				</EditorBubble>
			</EditorContent>
		</EditorRoot>
	)
}

export default Editor
