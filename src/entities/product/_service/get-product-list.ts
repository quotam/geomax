import { productRepo } from '../_repo/product'

export class GetProductListService {
	async exec() {
		return productRepo.getProductList()
	}
}

export const getProductListService = new GetProductListService()
