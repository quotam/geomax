'use client'

import React, { useEffect, useState } from 'react'

import { VideoEntity } from '@front/kernel/domain/types'

const VideoPlayer = ({ video }: { video: VideoEntity }) => {
	const [videoElement, setVideoElement] = useState<React.ReactNode | null>(null)

	useEffect(() => {
		// Handle different video types
		switch (video.type) {
			case 'youtube':
				setVideoElement(
					<iframe
						src={`https://www.youtube.com/embed/${video.url}`}
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
						className="w-full h-full rounded-md"
					/>
				)
				break
			case 'tiktok':
				setVideoElement(
					<iframe
						src={`https://www.tiktok.com/embed/${video.url}`}
						title="TikTok video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
						className="w-full h-full rounded-md"
					/>
				)
				break
			case 'rutube':
				setVideoElement(
					<iframe
						src={`https://rutube.ru/play/embed/${video.url}`}
						title="Rutube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
						className="w-full h-full rounded-md"
					/>
				)
				break
			default:
				setVideoElement(
					<div className="flex items-center justify-center w-full h-full bg-muted rounded-md">
						<p>Unsupported video type</p>
					</div>
				)
		}
	}, [video])

	return <div className="aspect-video w-full h-full">{videoElement}</div>
}

export default VideoPlayer
