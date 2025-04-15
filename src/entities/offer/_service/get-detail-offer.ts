import { offerRepo } from '../_repo/offer'

export class GetDetailOfferService {
	async exec(offerSlug: string) {
		try {
			const offer = await offerRepo.getDetailOffer(offerSlug)
			return offer
		} catch (error) {
			console.error(error)
			return null
		}
	}
}

export const getDetailOfferService = new GetDetailOfferService()
