import {
	CheckSquare,
	Code,
	Heading1,
	Heading2,
	Heading3,
	ImageIcon,
	List,
	ListOrdered,
	Text,
	TextQuote
} from 'lucide-react'
import { Command, createSuggestionItems, renderItems } from 'novel/extensions'
import { uploadFn } from '../vm/uploadImage'

export const suggestionItems = createSuggestionItems([
	{
		title: 'Текст',
		description: 'Просто начните вводить обычный текст.',
		searchTerms: ['p', 'paragraph'],
		icon: <Text size={18} />,
		command: ({ editor, range }) => {
			editor
				.chain()
				.focus()
				.deleteRange(range)
				.toggleNode('paragraph', 'paragraph')
				.run()
		}
	},
	{
		title: 'Список дел',
		description: 'Отслеживайте задачи с помощью списка дел.',
		searchTerms: ['todo', 'задача', 'список', 'галочка', 'чекбокс'],
		icon: <CheckSquare size={18} />,
		command: ({ editor, range }) => {
			editor.chain().focus().deleteRange(range).toggleTaskList().run()
		}
	},
	{
		title: 'Заголовок 1',
		description: 'Большой заголовок раздела.',
		searchTerms: ['название', 'большой', 'крупный'],
		icon: <Heading1 size={18} />,
		command: ({ editor, range }) => {
			editor
				.chain()
				.focus()
				.deleteRange(range)
				.setNode('heading', { level: 1 })
				.run()
		}
	},
	{
		title: 'Заголовок 2',
		description: 'Средний заголовок раздела.',
		searchTerms: ['подзаголовок', 'средний'],
		icon: <Heading2 size={18} />,
		command: ({ editor, range }) => {
			editor
				.chain()
				.focus()
				.deleteRange(range)
				.setNode('heading', { level: 2 })
				.run()
		}
	},
	{
		title: 'Заголовок 3',
		description: 'Маленький заголовок раздела.',
		searchTerms: ['подзаголовок', 'маленький'],
		icon: <Heading3 size={18} />,
		command: ({ editor, range }) => {
			editor
				.chain()
				.focus()
				.deleteRange(range)
				.setNode('heading', { level: 3 })
				.run()
		}
	},
	{
		title: 'Маркеры',
		description: 'Создайте простой список с маркерами.',
		searchTerms: ['неупорядоченный', 'точка'],
		icon: <List size={18} />,
		command: ({ editor, range }) => {
			editor.chain().focus().deleteRange(range).toggleBulletList().run()
		}
	},
	{
		title: 'Нумерованный список',
		description: 'Создайте список с нумерацией.',
		searchTerms: ['упорядоченный'],
		icon: <ListOrdered size={18} />,
		command: ({ editor, range }) => {
			editor.chain().focus().deleteRange(range).toggleOrderedList().run()
		}
	},
	{
		title: 'Цитата',
		description: 'Запишите цитату.',
		searchTerms: ['blockquote'],
		icon: <TextQuote size={18} />,
		command: ({ editor, range }) =>
			editor
				.chain()
				.focus()
				.deleteRange(range)
				.toggleNode('paragraph', 'paragraph')
				.toggleBlockquote()
				.run()
	},
	{
		title: 'Код',
		description: 'Запишите фрагмент кода.',
		searchTerms: ['codeblock'],
		icon: <Code size={18} />,
		command: ({ editor, range }) =>
			editor.chain().focus().deleteRange(range).toggleCodeBlock().run()
	},
	{
		title: 'Изображение',
		description: 'Загрузите изображение с вашего компьютера.',
		searchTerms: ['photo', 'picture', 'media'],
		icon: <ImageIcon size={18} />,
		command: ({ editor, range }) => {
			editor.chain().focus().deleteRange(range).run()
			const input = document.createElement('input')
			input.type = 'file'
			input.accept = 'image/*'
			input.onchange = async () => {
				if (input.files?.length) {
					const file = input.files[0]
					const pos = editor.view.state.selection.from
					uploadFn(file, editor.view, pos)
				}
			}
			input.click()
		}
	}
])

export const slashCommand = Command.configure({
	suggestion: {
		items: () => suggestionItems,
		render: renderItems
	}
})
