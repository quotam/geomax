import { productRepo } from '../_repo/product'

export class GetSingleCategoryService {
	async exec(slug: string) {
		try {
			const cat = await productRepo.getSingleCategory(slug)
			return cat
		} catch (error) {
			console.error(error)
			return null
		}
	}
}

export const getSingleCategoryService = new GetSingleCategoryService()
