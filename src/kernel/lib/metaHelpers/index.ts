import { VideoEntity } from '@front/kernel/domain/types'

// Вспомогательные функции
export const convertVideosToOGFormat = (videos?: VideoEntity[]) => {
	return videos?.map(video => {
		const dimensions = getVideoDimensions(video.type)
		return {
			url: getVideoUrl(video),
			width: dimensions.width,
			height: dimensions.height,
			type: getMimeType(video.type),
			alt: `Product video`
		}
	})
}

export const getVideoDimensions = (type: VideoEntity['type']) => {
	switch (type) {
		case 'tiktok':
			return { width: 1080, height: 1920 }
		case 'rutube':
			return { width: 1280, height: 720 }
		default:
			return { width: 1280, height: 720 }
	}
}

export const getMimeType = (type: VideoEntity['type']) => {
	switch (type) {
		case 'tiktok':
			return 'video/mp4'
		case 'rutube':
			return 'video/mp4'
		default:
			return 'video/mp4'
	}
}

export const getVideoUrl = (video: VideoEntity) => {
	switch (video.type) {
		case 'youtube':
			const videoId = video.url.split('v=')[1]
			return `https://www.youtube.com/embed/${videoId}`
		case 'tiktok':
			return video.url.replace('/video/', '/embed/')
		case 'rutube':
			return video.url.replace('/video/', '/embed/')
		default:
			return video.url
	}
}
