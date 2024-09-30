'use client'

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
import React, { useState } from 'react'
import { Separator } from '@front/shared/ui/separator'
import { LinkSelector } from './ui/linkSelector'
import { TextButtons } from './ui/text-buttons'
import { ColorSelector } from './ui/colorSelector'
import { NodeSelector } from './ui/nodeSelector'
import { defaultExtensions } from './model/extensions'
import { slashCommand, suggestionItems } from './model/suggestionItems'
import { handleCommandNavigation, ImageResizer } from 'novel/extensions'
import { handleImageDrop, handleImagePaste } from 'novel/plugins'
import { uploadFn } from './vm/uploadImage'
import AlignButtons from './ui/alignButtons'

const extensions = [...defaultExtensions, slashCommand]

interface EditorProp {
	initialValue?: JSONContent
	onChange: (value: string) => void
}
const Editor = ({ initialValue, onChange }: EditorProp) => {
	const [openNode, setOpenNode] = useState(false)
	const [openColor, setOpenColor] = useState(false)
	const [openLink, setOpenLink] = useState(false)

	return (
		<EditorRoot>
			<EditorContent
				className="min-h-50"
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
						class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full border border-input rounded-md min-h-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 p-4`
					}
				}}
				onUpdate={({ editor }) => {
					onChange(editor.getHTML())
				}}
				slotAfter={<ImageResizer />}
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
				<AlignButtons />
				<EditorBubble
					tippyOptions={{
						placement: 'top'
					}}
					className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
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
