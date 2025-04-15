import { offerRepo } from '../_repo/offer'

export class GetOffersListService {
	async exec() {
		return offerRepo.getOffersList()
	}
}

export const getOffersListService = new GetOffersListService()
