import { productRepo } from '../_repo/product'

export class GetFacturerListService {
	async exec() {
		return productRepo.getFactureList()
	}
}

export const getFacturerListService = new GetFacturerListService()
