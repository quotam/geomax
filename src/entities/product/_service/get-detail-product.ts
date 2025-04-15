import { productRepo } from '../_repo/product'

export class GetDetailProductService {
	async exec(slug: string) {
		try {
			const product = await productRepo.getDetailProduct(slug)
			return product
		} catch (error) {
			console.error(error)
			return null
		}
	}
}

export const getDetailProductService = new GetDetailProductService()
