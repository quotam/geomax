'use client'

import { useState } from 'react'

import VideoPlayer from '@front/features/videoPlayer/pub/player'
import { VideoEntity } from '@front/kernel/domain/types'
import { cn } from '@front/shared/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface VideoCarouselProps {
	videos: VideoEntity[]
}

export default function VideoCarousel({ videos }: VideoCarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0)

	// No videos to display
	if (!videos || videos.length === 0) {
		return null
	}

	// Only one video, no need for carousel controls
	if (videos.length === 1) {
		return (
			<div className="w-full">
				<VideoPlayer video={videos[0]} />
			</div>
		)
	}

	const nextVideo = () => {
		setCurrentIndex(prevIndex => (prevIndex + 1) % videos.length)
	}

	const prevVideo = () => {
		setCurrentIndex(prevIndex => (prevIndex - 1 + videos.length) % videos.length)
	}

	return (
		<div className="relative w-full">
			<div className="aspect-video w-full">
				<VideoPlayer video={videos[currentIndex]} />
			</div>

			{/* Navigation Controls */}
			<div className="absolute inset-0 flex items-center justify-between pointer-events-none">
				<button
					onClick={prevVideo}
					className="size-12 sm:size-8 rounded-lg bg-black/50 text-white flex items-center justify-center ml-2 pointer-events-auto hover:bg-black/70 transition-colors"
					aria-label="Previous video"
				>
					<ChevronLeft className="h-6 w-6" />
				</button>

				<button
					onClick={nextVideo}
					className="size-12 sm:size-8 rounded-lg bg-black/50 text-white flex items-center justify-center mr-2 pointer-events-auto hover:bg-black/70 transition-colors"
					aria-label="Next video"
				>
					<ChevronRight className="h-6 w-6" />
				</button>
			</div>

			{/* Indicators */}
			<div className="flex justify-center mt-4 gap-2">
				{videos.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrentIndex(index)}
						className={cn(
							'w-3 h-3 rounded-full transition-colors',
							currentIndex === index ? 'bg-primary' : 'bg-muted-foreground/30 hover:bg-muted-foreground'
						)}
						aria-label={`Go to video ${index + 1}`}
					/>
				))}
			</div>
		</div>
	)
}
