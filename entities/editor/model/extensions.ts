import {
	//AIHighlight,
	Color,
	HorizontalRule,
	Placeholder,
	StarterKit,
	HighlightExtension,
	TaskItem,
	TaskList,
	TextStyle,
	TiptapLink,
	TiptapUnderline
} from 'novel/extensions'

import ImageResize from 'tiptap-extension-resize-image'

import { TextAlign } from '@tiptap/extension-text-align'
import { UploadImagesPlugin } from 'novel/plugins'

import { cx } from 'class-variance-authority'

import { Mark, mergeAttributes } from '@tiptap/core'

interface CustomMarkOptions {
	HTMLAttributes: Record<string, any>
	classNames: string[] // массив классов для добавления
}

export const CustomMark = Mark.create<CustomMarkOptions>({
	name: 'buttonLink',

	// Опции по умолчанию
	addOptions() {
		return {
			HTMLAttributes: {
				class:
					'bg-primary text-primary-foreground shadow hover:bg-primary/90 py-2 rounded-sm px-8 font-medium cursor-pointer leading-[4rem]'
			},
			classNames: []
		}
	},

	// Добавляем наш атрибут `class`
	addAttributes() {
		return {
			class: {
				default: null,
				parseHTML: element => element.getAttribute('class'),
				renderHTML: attributes => {
					if (!attributes.class) {
						return {}
					}
					return { class: attributes.class }
				}
			}
		}
	},

	parseHTML() {
		return [
			{
				tag: 'span' // тег, который будет использоваться для данного марка
			}
		]
	},

	renderHTML({ HTMLAttributes }) {
		const mergedClassNames = [
			...this.options.classNames,
			HTMLAttributes.class || ''
		]
			.join(' ')
			.trim()

		return [
			'span',
			mergeAttributes(this.options.HTMLAttributes, { class: mergedClassNames }),
			0
		]
	}
})

const underline = TiptapUnderline

const placeholder = Placeholder.configure({
	placeholder: "Нажмите '/' для просмотра команд..",
	emptyNodeClass:
		'first:before:text-muted-foreground first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none'
})

const color = Color
const textStyle = TextStyle

const tiptapLink = TiptapLink.configure({})

const tiptapImage = ImageResize.extend({
	addProseMirrorPlugins() {
		return [
			UploadImagesPlugin({
				imageClass: cx('opacity-40')
			})
		]
	}
})

const taskList = TaskList.configure({})
const taskItem = TaskItem.configure({
	nested: true
})
const horizontalRule = HorizontalRule.configure({})

const starterKit = StarterKit.configure({
	horizontalRule: false,
	dropcursor: {
		color: '#DBEAFE',
		width: 4
	}
})

export const defaultExtensions = [
	starterKit,
	placeholder,
	tiptapLink,
	tiptapImage.configure({
		allowBase64: true
	}),
	taskList,
	taskItem,
	underline,
	HighlightExtension,
	horizontalRule,
	color,
	CustomMark,
	textStyle,
	CustomMark,
	TextAlign.configure({ types: ['heading', 'paragraph', 'image'] })
]
