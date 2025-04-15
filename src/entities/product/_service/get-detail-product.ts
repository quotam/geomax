import { productRepo } from '../_repo/product'

export class GetDetailProductService {
	async exec(slug: string) {
		return productRepo.getDetailProduct(slug)
	}
}

export const getDetailProductService = new GetDetailProductService()
