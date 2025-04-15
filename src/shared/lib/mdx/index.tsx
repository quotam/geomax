'use client'

import { useMemo } from 'react'

import { ImageProps } from 'next/image'
import Link from 'next/link'

import { Button, ButtonVariantsProps } from '@front/shared/ui/button'
import { AppImage } from '@front/shared/ui/image'
import { cva } from 'class-variance-authority'
import { getMDXComponent } from 'mdx-bundler/client'

const variants = cva('prose-slate max-w-none', {
	variants: {
		variant: {
			default: 'prose dark:prose-invert',
			invert: 'prose-invert dark:prose'
		},
		size: {
			lg: 'prose-lg',
			md: 'prose',
			sm: 'prose-sm'
		}
	},
	defaultVariants: {
		size: 'md',
		variant: 'default'
	}
})

type MdxComponentProps = {
	className?: string
	variant?: 'default' | 'invert'
	size?: 'lg' | 'md' | 'sm'
}

interface Props extends ButtonVariantsProps {
	text: string
}

const ModalButton = ({ text, ...variants }: Props) => {
	return (
		<Button {...variants} asChild className="mb-4">
			<Link id={'open-modal' + text} className="no-underline" href={'?modal#' + 'open-modal' + text}>
				{text}
			</Link>
		</Button>
	)
}

interface NextImageProps extends ImageProps {
	imagePath?: string
}

const NextImage = ({ imagePath, ...props }: NextImageProps) => {
	return <AppImage {...props} src={imagePath ? imagePath + props.src : props.src} />
}

type CustomComponents = Record<string, unknown>

export function useMdxComponent(code: string, imagePath?: string, components?: CustomComponents) {
	return useMemo(() => {
		const Component = getMDXComponent(code)

		return function MdxComponent({ className, size, variant }: MdxComponentProps) {
			return (
				<div
					className={variants({
						className,
						variant,
						size
					})}
				>
					<Component
						components={{
							...components,
							a: Link,
							ModalButton: ModalButton,
							Image: ({ ...props }: ImageProps) => <NextImage imagePath={imagePath} {...props} />
						}}
					/>
				</div>
			)
		}
	}, [code, components, imagePath])
}

export function MdxCode({
	code,
	components,
	imagePath,
	...props
}: MdxComponentProps & { code: string; imagePath?: string; components?: CustomComponents }) {
	const Component = useMdxComponent(code, imagePath, components)
	return <Component {...props} />
}
