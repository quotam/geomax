import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { cn } from '../lib/utils'
import { Input } from './input'

const renderContent = (node: any) => {
	if (!node) return null

	switch (node.type) {
		case 'paragraph':
			return (
				<p
					className={node.attrs?.class}
					style={{ textAlign: node.attrs?.textAlign || 'left' }}
				>
					{node.content ? (
						node.content.map((childNode: any, index: number) => (
							<React.Fragment key={index}>{renderContent(childNode)}</React.Fragment>
						))
					) : (
						<br />
					)}
				</p>
			)

		case 'heading':
			switch (node.attrs.level) {
				case 2:
					return (
						<h2
							key={Math.random()} // добавляем уникальный ключ
							style={{ textAlign: node.attrs?.textAlign || 'left' }}
							className={node.attrs.class}
						>
							{node.content?.map((childNode: any, index: number) => (
								<React.Fragment key={index}>{renderContent(childNode)}</React.Fragment>
							))}
						</h2>
					)
				case 3:
					return (
						<h3
							key={Math.random()}
							style={{ textAlign: node.attrs?.textAlign || 'left' }}
							className={node.attrs.class}
						>
							{node.content?.map((childNode: any, index: number) => (
								<React.Fragment key={index}>{renderContent(childNode)}</React.Fragment>
							))}
						</h3>
					)
				default:
					return (
						<h1
							key={Math.random()}
							className={cn('text-heading', node.attrs?.class)}
							style={{ textAlign: node.attrs?.textAlign || 'left' }}
						>
							{node.content?.map((childNode: any, index: number) => (
								<React.Fragment key={index}>{renderContent(childNode)}</React.Fragment>
							))}
						</h1>
					)
			}

		case 'image':
			return <RenderNextImage key={Math.random()} imageData={node} />

		case 'horizontalRule':
			return <hr key={Math.random()} />

		case 'taskList':
			return (
				<ul key={Math.random()}>
					{node.content?.map((childNode: any, index: number) => (
						<li key={index}>{renderContent(childNode)}</li>
					))}
				</ul>
			)

		case 'hardBreak':
			return <br key={Math.random()} />

		case 'taskItem':
			return (
				<div className="flex items-center" key={Math.random()}>
					<Input
						type="checkbox"
						checked={node.attrs?.checked}
						readOnly
						className="mr-2 inline-block w-4 h-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-500 checked:border-blue-500 focus:outline-none transition-colors duration-200"
					/>{' '}
					{node.content?.map((childNode: any, index: number) => (
						<React.Fragment key={index}>{renderContent(childNode)}</React.Fragment>
					))}
				</div>
			)

		case 'codeBlock':
			return (
				<code key={Math.random()}>
					{node.content?.map((childNode: any, index: number) => (
						<React.Fragment key={index}>{renderContent(childNode)}</React.Fragment>
					))}
				</code>
			)

		case 'text':
			let style = {},
				className = '',
				link = ''

			if (node.marks) {
				node.marks.forEach((mark: any) => {
					switch (mark.type) {
						case 'underline':
							style = { ...style, textDecoration: 'underline' }
							break
						case 'highlight':
							style = { ...style, backgroundColor: mark.attrs.color || 'yellow' }
							break
						case 'buttonLink':
							className =
								className +
								'bg-primary text-primary-foreground shadow hover:bg-primary/90 py-2 rounded-sm px-8 font-medium cursor-pointer leading-[4rem] no-underline'
							break
						case 'link':
							link = mark.attrs.href
							break
						case 'color':
							style = { ...style, color: mark.attrs.color }
							break
						case 'textStyle':
							style = { ...style, ...mark.attrs }
							break
						default:
							break
					}
				})
			}

			if (link)
				return (
					<Link
						key={Math.random()}
						href={link}
						className={cn('underline hover:no-underline text-primary', className)}
						style={style}
					>
						{node.text}
					</Link>
				)

			return (
				<span key={Math.random()} className={className} style={style}>
					{node.text}
				</span>
			)

		default:
			return null
	}
}

type ImageData = {
	type: string
	attrs: {
		textAlign?: string
		src: string
		alt?: string | null
		style?: string | null
		title?: string | null
		loading?: string | null
		srcset?: string | null
		sizes?: string | null
		crossorigin?: string | null
		usemap?: string | null
		ismap?: boolean | null
		width?: number | null
		height?: number | null
		referrerpolicy?: string | null
		longdesc?: string | null
		decoding?: string | null
		class?: string | null
		id?: string | null
		name?: string | null
		draggable?: boolean | null
		tabindex?: number | null
		ariaLabel?: string | null
		ariaLabelledby?: string | null
		ariaDescribedby?: string | null
	}
}

const RenderNextImage = ({ imageData }: { imageData: ImageData }) => {
	const {
		src,
		alt,
		width,
		height,
		style,
		title,
		loading,
		class: className
	} = imageData.attrs

	// Пример парсинга стилей, если они в строке
	const parsedStyle = style ? parseInlineStyles(style) : {}

	return (
		<div style={{ textAlign: imageData.attrs.textAlign as any }}>
			<Image
				src={src}
				alt={alt || 'Image'}
				width={
					width
						? width
						: parsedStyle.width
							? Number(parsedStyle.width.replace('px', ''))
							: 700
				} // Установим ширину по умолчанию
				height={
					height
						? height
						: parsedStyle.height && parsedStyle.height !== 'auto'
							? Number(parsedStyle.height.replace('px', ''))
							: 500
				} // Установим высоту по умолчанию
				style={parsedStyle}
				title={title || undefined}
				loading={loading ? 'eager' : 'lazy'} // Ленивая загрузка по умолчанию
				className={className || undefined}
			/>
		</div>
	)
}

// Вспомогательная функция для парсинга inline стилей
const parseInlineStyles = (styleString: string) => {
	return styleString.split(';').reduce((styleObj: any, styleProp) => {
		const [key, value] = styleProp.split(':').map(s => s.trim())
		if (key && value) {
			styleObj[camelize(key)] = value
		}
		return styleObj
	}, {})
}

// Функция для преобразования кебаб-кейсов в camelCase
const camelize = (str: string) =>
	str.replace(/-./g, match => match.charAt(1).toUpperCase())

// Основной компонент для рендеринга всего документа
const JSONContentRenderer = ({ content }: { content: any }) => {
	if (!content) return null

	return (
		<>
			{typeof content === 'string'
				? JSON.parse(content)?.content.map((node: any, index: number) => (
						<React.Fragment key={index}>{renderContent(node)}</React.Fragment>
					))
				: content.content?.map((node: any, index: number) => (
						<React.Fragment key={index}>{renderContent(node)}</React.Fragment>
					))}
		</>
	)
}

export default JSONContentRenderer
