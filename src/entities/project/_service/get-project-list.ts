import { projectRepo } from '../_repo/project'

export class GetProjectListService {
	async exec() {
		return projectRepo.getProjectList()
	}
}

export const getProjectListService = new GetProjectListService()
