import { sliderRepo } from '../_repo/slider'

export class GetSliderContentService {
	async exec() {
		return sliderRepo.getSliderContent()
	}
}

export const getSliderContentService = new GetSliderContentService()
