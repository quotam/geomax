import { cache } from 'react'

import { contentApi } from '@front/shared/api/content'

import { SliderEntity } from '../_domain/types'

class SliderRepo {
	getSliderContent = cache(async (): Promise<{ slids: SliderEntity[]; imagePath: string }> => {
		const [slidesResult] = await Promise.allSettled([contentApi.fetchSlider()])

		if (slidesResult.status === 'fulfilled') {
			return {
				slids: slidesResult.value.slides,
				imagePath: contentApi.getStogarePath('infoblock')
			}
		}

		if (slidesResult.status === 'rejected') {
			console.error('Slider request failed:', slidesResult.reason)
		}

		return {
			slids: [],
			imagePath: ''
		}
	})
}

export const sliderRepo = new SliderRepo()
