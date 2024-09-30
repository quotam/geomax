'use client'
import {
	BubbleMenu,
	EditorContent,
	FloatingMenu,
	useEditor
} from '@tiptap/react'

import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import { cn } from '@front/shared/lib/utils'
import { BoldIcon, CodeIcon, ItalicIcon, StrikethroughIcon } from 'lucide-react'

export default () => {
	const editor = useEditor({
		extensions: [StarterKit, TextStyle, Color],
		injectCSS: false,
		editorProps: {
			attributes: {
				class:
					'min-h-40 focus-visible:outline-none rounded-md  p-3  focus-visible:ring-1 focus-visible:ring-ring border border-input typ'
			}
		}
	})

	return (
		<>
			{editor && (
				<BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
					<div className="px-2 py-1 shadow border bg-background rounded-sm mt-12 flex ">
						<button
							onClick={e => {
								e.preventDefault()
								editor.chain().focus().toggleBold().run()
							}}
							className={cn(
								'px-2 py-1 rounded-md',
								editor.isActive('bold') ? 'text-primary bg-accent  font-bold' : ''
							)}
						>
							<BoldIcon />
						</button>
						<button
							onClick={e => {
								e.preventDefault()
								editor.chain().focus().toggleItalic().run()
							}}
							className={cn(
								'px-2 py-1 rounded-md',
								editor.isActive('italic') ? 'text-primary bg-accent  font-bold' : ''
							)}
						>
							<ItalicIcon />
						</button>
						<button
							onClick={e => {
								e.preventDefault()
								editor.chain().focus().toggleStrike().run()
							}}
							className={cn(
								'px-2 py-1 rounded-md',
								editor.isActive('strike') ? 'text-primary bg-accent font-bold' : ''
							)}
						>
							<StrikethroughIcon />
						</button>
					</div>
				</BubbleMenu>
			)}
			{editor && (
				<FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
					<div className="px-4 py-2 shadow border bg-background rounded-sm mt-12 flex gap-4">
						<button
							onClick={e => {
								e.preventDefault()
								editor.chain().focus().toggleHeading({ level: 1 }).run()
							}}
							className={
								editor.isActive('heading', { level: 1 }) ? 'text-primary' : ''
							}
						>
							H1
						</button>
						<button
							onClick={e => {
								e.preventDefault()
								editor.chain().focus().toggleHeading({ level: 2 }).run()
							}}
							className={
								editor.isActive('heading', { level: 2 }) ? 'text-primary' : ''
							}
						>
							H2
						</button>
						<button
							onClick={e => {
								e.preventDefault()
								editor.chain().focus().toggleBulletList().run()
							}}
							className={editor.isActive('bulletList') ? 'is-active' : ''}
						>
							Bullet list
						</button>
					</div>
				</FloatingMenu>
			)}
			<EditorContent className="typ" editor={editor} />
		</>
	)
}
