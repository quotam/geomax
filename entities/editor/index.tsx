'use client'
import {
	BubbleMenu,
	EditorContent,
	FloatingMenu,
	useEditor
} from '@tiptap/react'

import Placeholder from '@tiptap/extension-placeholder'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'

export default ({ placeholder }: { placeholder: string }) => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			TextStyle,
			Color,
			Placeholder.configure({
				placeholder,
				emptyNodeClass:
					'first:before:text-secondary first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none'
			})
		],
		injectCSS: false,
		editorProps: {
			attributes: {
				class:
					'min-h-40 focus-visible:outline-none rounded-md  px-3 py-1 focus-visible:ring-1 focus-visible:ring-ring border border-input typ'
			}
		},
		content: `
      <p>
        Hey, try to select some text here. There will popup a menu for selecting some inline styles. Remember: you have full control about content and styling of this menu.
      </p>
    `
	})

	return (
		<>
			{editor && (
				<BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
					<div className="bubble-menu">
						<button
							onClick={() => editor.chain().focus().toggleBold().run()}
							className={editor.isActive('bold') ? 'is-active' : ''}
						>
							Bold
						</button>
						<button
							onClick={() => editor.chain().focus().toggleItalic().run()}
							className={editor.isActive('italic') ? 'is-active' : ''}
						>
							Italic
						</button>
						<button
							onClick={() => editor.chain().focus().toggleStrike().run()}
							className={editor.isActive('strike') ? 'is-active' : ''}
						>
							Strike
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
			<EditorContent editor={editor} />
		</>
	)
}
