import { projectRepo } from '../_repo/project'

export class GetDetailProjectService {
	async exec(slug: string) {
		try {
			return await projectRepo.getDetailProject(slug)
		} catch (error) {
			console.log(error)
			return null
		}
	}
}

export const getDetailPojectService = new GetDetailProjectService()
