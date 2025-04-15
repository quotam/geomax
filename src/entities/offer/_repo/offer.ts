import { cache } from 'react'

import { contentApi } from '@front/shared/api/content'

import { OfferDetailEntity, OfferEntity } from '../_damain/types'

class OfferRepository {
	getDetailOffer = cache(async (offerSlug: string): Promise<OfferDetailEntity> => {
		const offer = await contentApi.fetchOffer(offerSlug)

		return {
			id: offer.id,

			title: offer.title,
			slug: offerSlug,
			description: offer.description,

			metaDescription: offer.metaDescription,
			metaKeywords: offer.metaKeywords,

			body: offer.body,
			images: offer.images,
			videos: offer.videos,

			thumbnail: offer.thumbnail,
			imagePath: contentApi.getStogarePath('offers', offerSlug)
		}
	})

	getOffersList = cache(async (): Promise<OfferEntity[]> => {
		const manifest = await contentApi.fetchManifest()

		const fetchOffer = async (articleSlug: string): Promise<OfferEntity> => {
			const offer = await contentApi.fetchOffer(articleSlug)

			return {
				id: offer.id,
				thumbnail: offer.thumbnail,
				title: offer.title,
				imagePath: contentApi.getStogarePath('offers', articleSlug),
				description: offer.description,
				slug: articleSlug
			}
		}

		const setteldOffers = await Promise.allSettled(manifest.offers?.map(fetchOffer) ?? [])

		setteldOffers.forEach((value, i) => {
			if (value.status === 'rejected') {
				console.error({
					msg: 'Offer fetch failed',
					slug: manifest.offers?.[i],
					error: value.reason
				})
			}
		})

		return setteldOffers
			.filter(
				(offerResult): offerResult is PromiseFulfilledResult<OfferEntity> =>
					offerResult.status === 'fulfilled'
			)
			.map(offer => offer.value)
	})
}

export const offerRepo = new OfferRepository()
