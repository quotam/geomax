'use client'

import type React from 'react'
import { useEffect, useRef, useState } from 'react'

import Image from 'next/image'

import { cn } from '@front/shared/lib/utils'
import { Button } from '@front/shared/ui/button'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'

type GalleryVariant = 'standard' | 'product'

interface GalleryProps {
	images: string[]
	alt?: string
	variant?: GalleryVariant
	title?: string
	className?: string
}

export function Gallery({
	images,
	alt = 'Image',
	variant = 'standard',
	title,
	className
}: GalleryProps) {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null)
	const dialogRef = useRef<HTMLDialogElement>(null)
	const isOpen = fullscreenIndex !== null

	// Handle keyboard navigation
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!isOpen) return

			switch (e.key) {
				case 'ArrowLeft':
					setFullscreenIndex(prev => (prev !== null ? (prev - 1 + images.length) % images.length : null))
					break
				case 'ArrowRight':
					setFullscreenIndex(prev => (prev !== null ? (prev + 1) % images.length : null))
					break
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [isOpen, images.length])

	// Control dialog open/close
	useEffect(() => {
		const dialog = dialogRef.current
		if (!dialog) return

		if (isOpen) {
			dialog.showModal()
			// Prevent body scrolling when dialog is open
			document.body.style.overflow = 'hidden'
		} else {
			dialog.close()
			document.body.style.overflow = ''
		}

		return () => {
			document.body.style.overflow = ''
		}
	}, [isOpen])

	// Handle dialog close event
	useEffect(() => {
		const dialog = dialogRef.current
		if (!dialog) return

		const handleClose = () => {
			setFullscreenIndex(null)
		}

		dialog.addEventListener('close', handleClose)
		return () => dialog.removeEventListener('close', handleClose)
	}, [])

	const openFullscreen = (index: number) => {
		setFullscreenIndex(index)
	}

	const closeFullscreen = () => {
		setFullscreenIndex(null)
	}

	const goToPrevious = () => {
		const isFirstImage = currentIndex === 0
		const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1
		setCurrentIndex(newIndex)
	}

	const goToNext = () => {
		const isLastImage = currentIndex === images.length - 1
		const newIndex = isLastImage ? 0 : currentIndex + 1
		setCurrentIndex(newIndex)
	}

	const goToImage = (index: number) => {
		setCurrentIndex(index)
	}

	const goToPreviousFullscreen = (e?: React.MouseEvent) => {
		e?.stopPropagation()
		setFullscreenIndex(prev => (prev !== null ? (prev - 1 + images.length) % images.length : null))
	}

	const goToNextFullscreen = (e?: React.MouseEvent) => {
		e?.stopPropagation()
		setFullscreenIndex(prev => (prev !== null ? (prev + 1) % images.length : null))
	}

	if (!images || images.length === 0) {
		return (
			<div className="relative aspect-[5/4] bg-muted rounded-md">
				<div className="absolute inset-0 flex items-center justify-center">
					<p className="text-muted-foreground">No images available</p>
				</div>
			</div>
		)
	}

	return (
		<div className={cn('space-y-4', className)}>
			{/* Standard Gallery Layout */}
			{variant === 'standard' && (
				<>
					{title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{images.map((image, index) => (
							<button
								key={index}
								className="relative aspect-square rounded-md overflow-hidden hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
								onClick={() => openFullscreen(index)}
								aria-label={`View ${alt} - image ${index + 1}`}
							>
								<Image
									src={image || '/placeholder.svg'}
									alt={`${alt} - image ${index + 1}`}
									fill
									className="object-cover"
									sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
								/>
							</button>
						))}
					</div>
				</>
			)}

			{/* Product Gallery Layout */}
			{variant === 'product' && (
				<>
					{/* Main image */}
					<div className="relative aspect-[5/4] bg-secondary rounded-md overflow-hidden group">
						<p className="text-xs text-muted-foreground absolute bottom-1 left-1">
							Внешний вид товара, может отличаться от иллюстраций, представленных на сайте!
						</p>
						<Image
							src={images[currentIndex] || '/placeholder.svg'}
							alt={`${alt} - main image`}
							fill
							className="object-contain"
							sizes="(max-width: 768px) 100vw, 600px"
							priority
						/>

						{/* Fullscreen button */}
						<Button
							variant="ghost"
							size="icon"
							className="absolute top-2 right-2 h-8 w-8 rounded-sm bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
							onClick={() => openFullscreen(currentIndex)}
						>
							<Maximize2 className="h-4 w-4" />
							<span className="sr-only">View fullscreen</span>
						</Button>

						{/* Navigation arrows */}
						{images.length > 1 && (
							<>
								<Button
									variant="ghost"
									size="icon"
									className="absolute left-2 top-1/2 -translate-y-1/2 size-8 rounded-lg bg-background/80 hover:bg-background"
									onClick={goToPrevious}
								>
									<ChevronLeft className="h-4 w-4" />
									<span className="sr-only">Previous image</span>
								</Button>
								<Button
									variant="ghost"
									size="icon"
									className="absolute right-2 top-1/2 -translate-y-1/2 size-8 rounded-lg bg-background/80 hover:bg-background"
									onClick={goToNext}
								>
									<ChevronRight className="h-4 w-4" />
									<span className="sr-only">Next image</span>
								</Button>
							</>
						)}
					</div>

					{/* Thumbnails */}
					{images.length > 1 && (
						<div className="flex space-x-2 overflow-x-auto pb-1">
							{images.map((image, index) => (
								<button
									key={index}
									className={cn(
										'relative w-20 h-20 rounded-md overflow-hidden border flex-shrink-0 transition-all',
										currentIndex === index
											? 'ring-2 ring-primary'
											: 'hover:ring-1 hover:ring-muted-foreground/20'
									)}
									onClick={() => goToImage(index)}
								>
									<Image
										src={image || '/placeholder.svg'}
										alt={`${alt} thumbnail ${index + 1}`}
										fill
										className="object-cover"
										sizes="80px"
									/>
								</button>
							))}
						</div>
					)}
				</>
			)}

			{/* Fullscreen dialog (shared between variants) */}
			<dialog
				ref={dialogRef}
				className="backdrop:bg-black/80 backdrop:backdrop-blur-sm m-0 p-0 max-w-none max-h-none w-full h-full bg-transparent"
				onClick={closeFullscreen}
			>
				<div
					className="relative w-full h-full flex items-center justify-center"
					onClick={e => e.stopPropagation()}
				>
					{/* Close button */}
					<Button
						variant="ghost"
						size="icon"
						className="absolute top-4 right-4 z-10 h-10 w-10 rounded-lg bg-black/50 hover:bg-black/70 text-white"
						onClick={closeFullscreen}
					>
						<X className="h-5 w-5" />
						<span className="sr-only">Close fullscreen</span>
					</Button>

					{/* Image container */}
					<div className="relative w-full h-full flex items-center justify-center">
						{fullscreenIndex !== null && (
							<Image
								src={images[fullscreenIndex] || '/placeholder.svg'}
								alt={`${alt} - image ${fullscreenIndex + 1}`}
								fill
								className="object-contain p-4"
								sizes="100vw"
								priority
							/>
						)}
					</div>

					{/* Navigation arrows */}
					{images.length > 1 && fullscreenIndex !== null && (
						<>
							<Button
								variant="ghost"
								size="icon"
								className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-lg bg-black/50 hover:bg-black/70 text-white"
								onClick={goToPreviousFullscreen}
							>
								<ChevronLeft className="h-6 w-6" />
								<span className="sr-only">Previous image</span>
							</Button>
							<Button
								variant="ghost"
								size="icon"
								className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-lg bg-black/50 hover:bg-black/70 text-white"
								onClick={goToNextFullscreen}
							>
								<ChevronRight className="h-6 w-6" />
								<span className="sr-only">Next image</span>
							</Button>
						</>
					)}

					{/* Image counter */}
					{fullscreenIndex !== null && (
						<div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-sm text-sm">
							{fullscreenIndex + 1} / {images.length}
						</div>
					)}
				</div>
			</dialog>
		</div>
	)
}
