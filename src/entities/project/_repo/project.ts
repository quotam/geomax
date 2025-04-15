import { cache } from 'react'

import { contentApi } from '@front/shared/api/content'

import { ProjectDetailEntity, ProjectEntity } from '../_damain/types'

class ProjectRepository {
	getDetailProject = cache(async (projectSlug: string): Promise<ProjectDetailEntity> => {
		const project = await contentApi.fetchProject(projectSlug)

		return {
			id: project.id,

			title: project.title,
			slug: projectSlug,
			description: project.description,

			metaDescription: project.metaDescription,
			metaKeywords: project.metaKeywords,

			body: project.body,
			images: project.images,
			videos: project.videos,

			thumbnail: project.thumbnail,
			imagePath: contentApi.getStogarePath('project', projectSlug)
		}
	})

	getProjectList = cache(async (): Promise<ProjectEntity[]> => {
		const manifest = await contentApi.fetchManifest()

		const fetchProject = async (projectSlug: string): Promise<ProjectEntity> => {
			const offer = await contentApi.fetchProject(projectSlug)

			return {
				id: offer.id,
				thumbnail: offer.thumbnail,
				title: offer.title,
				imagePath: contentApi.getStogarePath('project', projectSlug),
				description: offer.description,
				slug: projectSlug
			}
		}

		const setteldProjects = await Promise.allSettled(manifest.projects?.map(fetchProject) ?? [])

		setteldProjects.forEach((value, i) => {
			if (value.status === 'rejected') {
				console.error({
					msg: 'Project fetch failed',
					slug: manifest.projects?.[i],
					error: value.reason
				})
			}
		})

		return setteldProjects
			.filter(
				(ProjectResult): ProjectResult is PromiseFulfilledResult<ProjectEntity> =>
					ProjectResult.status === 'fulfilled'
			)
			.map(project => project.value)
	})
}

export const projectRepo = new ProjectRepository()
