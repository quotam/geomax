import { userEntity } from '@front/entities/user/_domain/entities'

class ArtileEntity {
	clientView = {
		id: true,
		title: true,
		body: true,
		image: true,
		desc: true,
		meta: true,
		createdAt: true,
		category: {
			select: {
				id: true,
				title: true
			}
		}
	}

	adminView = {
		...this.clientView,
		status: true,
		updatedAt: true,
		user: {
			select: userEntity.fullUser
		}
	}
}

export const articleEntity = new ArtileEntity()
