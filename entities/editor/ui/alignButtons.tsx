import { useEditor } from 'novel'
import React from 'react'

const AlignButtons = () => {
	const { editor } = useEditor()
	if (!editor) return null

	return (
		<div>
			<button
				type="button"
				onClick={() => editor!!.chain().focus().setTextAlign('left').run()}
				className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
			>
				left
			</button>
			<button
				type="button"
				onClick={() => editor.chain().focus().setTextAlign('center').run()}
				className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
			>
				center
			</button>
			<button
				type="button"
				onClick={() => editor.chain().focus().setTextAlign('right').run()}
				className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
			>
				right
			</button>
		</div>
	)
}

export default AlignButtons
