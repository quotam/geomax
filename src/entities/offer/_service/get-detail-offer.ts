import { offerRepo } from '../_repo/offer'

export class GetDetailOfferService {
	async exec(offerSlug: string) {
		return offerRepo.getDetailOffer(offerSlug)
	}
}

export const getDetailOfferService = new GetDetailOfferService()
