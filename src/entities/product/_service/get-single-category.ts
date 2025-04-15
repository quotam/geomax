import { productRepo } from '../_repo/product'

export class GetSingleCategoryService {
	async exec(slug: string) {
		return productRepo.getSingleCategory(slug)
	}
}

export const getSingleCategoryService = new GetSingleCategoryService()
