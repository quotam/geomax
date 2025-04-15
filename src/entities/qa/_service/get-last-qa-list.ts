import { qaRepo } from '../_repo/qa'

export class GetLastQaListService {
	async exec() {
		const all = await qaRepo.getQaList()

		return {
			faqs: all.faqs.reverse().slice(0, 8),
			imagePath: all.imagePath
		}
	}
}

export const getLastQaListService = new GetLastQaListService()
