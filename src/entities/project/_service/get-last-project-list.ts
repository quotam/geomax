import { projectRepo } from '../_repo/project'

export class GetLastProjectsListService {
	async exec() {
		const all = await projectRepo.getProjectList()
		return all.reverse().slice(0, 8)
	}
}

export const getLastProjectListService = new GetLastProjectsListService()
