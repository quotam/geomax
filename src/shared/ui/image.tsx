'use client'

import type React from 'react'
import { useState } from 'react'

import Image, { type ImageProps } from 'next/image'

type AppImageProps = ImageProps & {
	fallbackSrc?: string
}

export function AppImage({
	src,
	alt,
	fallbackSrc = '/placeholder.svg?text=Image+Not+Found',
	onError,
	...props
}: AppImageProps) {
	const [imgSrc, setImgSrc] = useState(src)
	const [hasError, setHasError] = useState(false)

	const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		if (!hasError) {
			setImgSrc(fallbackSrc)
			setHasError(true)

			// Call the original onError if provided
			if (onError) {
				onError(e)
			}
		}
	}
	return <Image {...props} src={imgSrc || '/placeholder.svg'} alt={alt} onError={handleError} />
}
