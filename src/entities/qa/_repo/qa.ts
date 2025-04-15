import { cache } from 'react'

import { contentApi } from '@front/shared/api/content'

import { QaEntity } from '../_domain/types'

class QaRepo {
	getQaList = cache(async (): Promise<{ faqs: QaEntity[]; imagePath: string }> => {
		const [faqResult] = await Promise.allSettled([contentApi.fetchFaq()])

		if (faqResult.status === 'fulfilled') {
			return {
				faqs: faqResult.value.faqs,
				imagePath: contentApi.getStogarePath('infoblock')
			}
		}

		if (faqResult.status === 'rejected') {
			console.error('Faq request failed:', faqResult.reason)
		}

		return { faqs: [], imagePath: '' }
	})
}

export const qaRepo = new QaRepo()
