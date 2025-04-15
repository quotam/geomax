import { qaRepo } from '../_repo/qa'

export class GetQaListService {
	async exec() {
		return qaRepo.getQaList()
	}
}

export const getQaListService = new GetQaListService()
