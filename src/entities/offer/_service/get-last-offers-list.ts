import { offerRepo } from '../_repo/offer'

export class GetLastOffersListService {
	async exec() {
		const all = await offerRepo.getOffersList()
		return all.slice(0, 6)
	}
}

export const getLastOffersListService = new GetLastOffersListService()
