import { productRepo } from '../_repo/product'

export class GetCategoriesListService {
	async exec() {
		return productRepo.getCategoryList()
	}
}

export const getCategoriesListService = new GetCategoriesListService()
